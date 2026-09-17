// Synthetic host processes only; these never contact Concentrate.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { openClawAdapter } from '../scripts/openclaw-live-adapter.mjs';

async function run({ text = 'CONCENTRATE_OK', usage = 402, stderr = '', exitCode = 0 } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'adapter-classification-'));
  const binary = join(dir, 'fixture-host');
  const body = { meta: { agentMeta: { provider: 'concentrate', model: 'test-model', usage: { input: usage } } }, payloads: [{ text }] };
  writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(body))});process.stderr.write(${JSON.stringify(stderr)});process.exitCode=${exitCode};\n`, { mode: 0o700 });
  const configPath = join(dir, 'config.json');
  writeFileSync(configPath, JSON.stringify({ agents: { defaults: { model: { primary: 'concentrate/test-model', fallbacks: [] }, models: { 'concentrate/test-model': { params: { maxTokens: 512 } } }, embeddedAgent: { projectSettingsPolicy: 'ignore' } } } }));
  try {
    return await openClawAdapter({ binary, configPath, stateDir: dir, transportPolicyVerified: true }).run({ model: 'test-model', maxOutputTokens: 512, timeoutMs: 3000 });
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('numeric usage equal to 402 is not a payment error', async () => {
  const result = await run();
  assert.equal(result.status, 'passed');
  assert.equal(result.httpStatus, undefined);
});

test('model text and warning prose are not authoritative HTTP status', async () => {
  assert.equal((await run({ stderr: 'debug: 402 tokens counted\n' })).status, 'passed');
  const result = await run({ text: 'payment required: 402', usage: 2 });
  assert.equal(result.status, 'failed');
  assert.equal(result.httpStatus, undefined);
});

test('unsuccessful host execution stays unknown without transport evidence', async () => {
  const result = await run({ text: '', stderr: 'HTTP 402 Payment Required', exitCode: 1 });
  assert.equal(result.status, 'unknown');
  assert.equal(result.httpStatus, undefined);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

async function run(steps) {
  const child = spawn(process.execPath, [fileURLToPath(new URL('./fixtures/cli-stdin.mjs', import.meta.url))], {
    env: { PATH: process.env.PATH }, stdio: ['pipe', 'pipe', 'pipe'],
  });
  let stdout = '', stderr = '', sent = 0, timedOut = false;
  const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, 4000);
  child.stdout.on('data', chunk => { stdout += chunk; });
  child.stderr.on('data', chunk => {
    stderr += chunk;
    if (sent < steps.length && stderr.includes(steps[sent][0])) {
      const answer = steps[sent++][1];
      if (answer === null) child.stdin.end(); else child.stdin.write(answer);
    }
  });
  try {
    const exitCode = await new Promise((resolve, reject) => { child.once('error', reject); child.once('close', resolve); });
    assert.equal(timedOut, false, 'CLI did not finish after input closed');
    assert.equal(sent, steps.length);
    assert.doesNotMatch(stderr, /UNEXPECTED_MUTATION/);
    return { exitCode, stdout, stderr };
  } finally { clearTimeout(timer); child.kill('SIGKILL'); }
}

test('setup EOF at an interactive prompt cancels cleanly without writes', async () => {
  const result = await run([['Filter models by name/vendor', null]]);
  assert.equal(result.exitCode, 130, result.stderr);
  assert.match(result.stderr, /Cancelled/);
  assert.equal(result.stdout, '');
});

test('setup validation errors remain failures rather than becoming cancellations', async () => {
  const result = await run([['Filter models by name/vendor', 'claude-haiku-4-5\n'], ['Select model numbers', '99999\n']]);
  assert.equal(result.exitCode, 1, result.stderr);
  assert.match(result.stderr, /Invalid model selection/);
  assert.doesNotMatch(result.stderr, /Cancelled/);
});

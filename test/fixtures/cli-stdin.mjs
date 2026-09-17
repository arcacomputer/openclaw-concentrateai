// Synthetic subprocess boundary: real CLI/readline, no host or paid network.
import { readFileSync } from 'node:fs';
import { registerConcentrateCli } from '../../src/cli.mjs';
const catalog = JSON.parse(readFileSync(new URL('../../docs/catalog.json', import.meta.url)));
Object.defineProperty(process.stdin, 'isTTY', { value: true });
Object.defineProperty(process.stderr, 'isTTY', { value: true });
globalThis.fetch = async url => {
  if (url !== 'https://api.concentrate.ai/v1/models') throw Error('Unexpected fixture request');
  return new Response(JSON.stringify(catalog));
};
const actions = new Map();
const command = name => ({
  description() { return this; }, option() { return this; },
  command: suffix => command(`${name} ${suffix}`),
  action(fn) { actions.set(name, fn); return this; },
});
registerConcentrateCli(command('openclaw'), {
  readSnapshot: async () => ({ valid: true, hash: 'synthetic-config', sourceConfig: {} }),
  mutate: async () => { process.stderr.write('UNEXPECTED_MUTATION\n'); throw Error('No writes allowed'); },
});
await actions.get('openclaw concentrate setup')({});

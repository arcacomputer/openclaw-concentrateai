import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectRows } from '../src/catalog.mjs';
let assertLiveCatalog;
try { ({ assertLiveCatalog } = await import('../scripts/verification/catalog-acceptance.mjs')); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
const sample = JSON.parse(readFileSync(new URL('../docs/catalog.json', import.meta.url))).data.find(row => projectRows([row]).length);
const catalog = ids => {
  const data = ids.map(id => ({ ...sample, id }));
  return { object: 'list', has_more: false, first_id: ids[0], last_id: ids.at(-1), data };
};
const result = body => {
  const models = projectRows(body.data);
  return { source: 'live', count: models.length, totalEligible: models.length, models };
};

test('native live catalog proof accepts additions and removals instead of freezing bundled IDs', () => {
  assert.equal(typeof assertLiveCatalog, 'function');
  const live = catalog(['new-upstream-model', 'retained-model']);
  assert.doesNotThrow(() => assertLiveCatalog(result(live), live));
});

test('native catalog proof rejects stale or fabricated rows and inconsistent counts', () => {
  const live = catalog(['new-upstream-model', 'retained-model']);
  assert.equal(typeof assertLiveCatalog, 'function');
  assert.throws(() => assertLiveCatalog(result(catalog(['old-bundled-model', 'retained-model'])), live));
  for (const change of [r => r.source = 'bundled', r => r.count++, r => r.totalEligible++, r => r.models.push(r.models[0])]) {
    const bad = result(live); change(bad);
    assert.throws(() => assertLiveCatalog(bad, live));
  }
  assert.throws(() => assertLiveCatalog(result(live), { ...live, has_more: true }));
});

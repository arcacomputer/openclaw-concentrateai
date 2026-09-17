import assert from 'node:assert/strict';
import { projectRows } from '../../src/catalog.mjs';
import { validateCatalog } from '../../src/catalog-maintenance.mjs';

// A live catalog is allowed to change independently of the bundled snapshot.
export function assertLiveCatalog(actual, currentCatalog) {
  validateCatalog(currentCatalog);
  const expected = projectRows(currentCatalog.data);
  assert.equal(actual.source, 'live');
  assert.equal(actual.count, expected.length);
  assert.equal(actual.totalEligible, expected.length);
  assert.deepEqual(actual.models, expected);
}

import test from 'node:test';
import assert from 'node:assert/strict';
const module = await import('../scripts/retest-plan.mjs').catch(error => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') return {};
  throw error;
});
const item = (index, model, feature, statuses) => ({ index, model, feature, maxOutputTokens: 512, expectedForwards: feature === 'tool-roundtrip' ? 2 : 1, attempts: statuses.map(status => ({ status })) });
const report = { cases: [item(1, 'mixed', 'basic-response', ['passed', 'failed-acceptance']), item(2, 'failed', 'basic-response', ['inconclusive']), item(3, 'control', 'basic-response', ['passed']), item(4, 'tool-control', 'tool-roundtrip', ['passed'])] };

test('retest planning preserves every unresolved/conflicting case and adds controls without dispatch', () => {
  assert.equal(typeof module.buildRetestPlan, 'function', 'Missing no-spend retest planner');
  const before = structuredClone(report);
  const plan = module.buildRetestPlan(report);
  assert.equal(plan.dispatchAllowed, false);
  assert.equal(plan.paidRequestsMade, 0);
  assert.deepEqual(plan.cases.map(x => x.caseIndex), [1, 2, 3, 4]);
  assert.equal(plan.cases[0].repetitions, 3);
  assert.equal(plan.cases[1].repetitions, 1);
  assert.deepEqual(plan.cases[0].reasons, ['conflicting-outcomes']);
  assert.deepEqual(plan.cases[2].reasons, ['positive-control']);
  assert.equal(plan.plannedAttempts, 6);
  assert.deepEqual(report, before);
  assert.deepEqual(module.buildRetestPlan(report), plan);
});

test('retest planning rejects ambiguous identities, statuses and invalid bounds', () => {
  assert.equal(typeof module.buildRetestPlan, 'function');
  for (const change of [r => r.cases.push(r.cases[0]), r => r.cases[0].attempts = [], r => r.cases[0].maxOutputTokens = 0, r => r.cases[0].attempts[0].status = 'looks-good', r => r.cases[0].model = '../unsafe']) {
    const bad = structuredClone(report); change(bad);
    assert.throws(() => module.buildRetestPlan(bad));
  }
});

test('feature recipes separate plain response from schema and quality from configuration', () => {
  assert.equal(typeof module.buildRetestPlan, 'function');
  const plan = module.buildRetestPlan(report);
  assert.equal(plan.recipes['basic-response'].requiresJson, false);
  assert.equal(plan.recipes.schema.requiresJson, true);
  assert.equal(plan.recipes.reasoning.provesReasoningQuality, false);
  assert.equal(plan.recipes.vision.separateMeaningFromFormatting, true);
  assert.equal(plan.limits.automaticRetries, false);
  assert.equal(plan.limits.raiseOutputCapsAutomatically, false);
});

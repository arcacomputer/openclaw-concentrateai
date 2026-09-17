import test from 'node:test';
import assert from 'node:assert/strict';
let evaluateFeature;
try { ({ evaluateFeature } = await import('../scripts/verification/feature-acceptance.mjs')); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }

test('basic response does not silently require structured JSON', () => {
  assert.equal(typeof evaluateFeature, 'function');
  assert.deepEqual(evaluateFeature('basic-response', 'PRODUCTION_OK'), {
    contentPassed: true, formatPassed: true, featurePassed: true,
  });
  assert.equal(evaluateFeature('basic-response', '{"ok":true}').featurePassed, false);
});

test('vision distinguishes correct color content from requested CSV formatting', () => {
  assert.equal(evaluateFeature('vision', 'red, blue').featurePassed, true);
  assert.deepEqual(evaluateFeature('vision', '{"left":"red","right":"blue"}'), {
    contentPassed: true, formatPassed: false, featurePassed: true,
  });
  for (const wrong of ['blue, red', '{"left":"blue","right":"red"}', 'not red, blue', '', null]) {
    assert.equal(evaluateFeature('vision', wrong).featurePassed, false);
  }
});

test('schema output requires exactly the declared object, not JSON-looking prose', () => {
  assert.equal(evaluateFeature('schema', '{ "ok": true }').featurePassed, true);
  for (const wrong of ['{"ok":false}', '{"ok":true,"extra":1}', '[{"ok":true}]', '```json\n{"ok":true}\n```', 'PRODUCTION_OK', null]) {
    assert.equal(evaluateFeature('schema', wrong).featurePassed, false);
  }
});

test('reasoning response does not require JSON formatting or claim reasoning quality', () => {
  assert.equal(evaluateFeature('reasoning', '42').featurePassed, true);
  for (const wrong of ['41', '{"ok":true}', '', null]) {
    assert.equal(evaluateFeature('reasoning', wrong).featurePassed, false);
  }
});

test('tool output must match the actual unpredictable fixture and rejects absent expectations', () => {
  assert.equal(evaluateFeature('tool-roundtrip', 'T-random-proof', 'T-random-proof').featurePassed, true);
  for (const [output, expected] of [['FEATURE_OK', 'T-random-proof'], ['', ''], ['', undefined], [null, undefined]]) {
    assert.equal(evaluateFeature('tool-roundtrip', output, expected).featurePassed, false);
  }
  assert.equal(evaluateFeature('unknown', 'PRODUCTION_OK').featurePassed, false);
});

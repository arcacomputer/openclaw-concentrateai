// Independent output acceptance. Transport/wire/accounting gates run separately.
export function evaluateFeature(feature, output, expected) {
  const text = typeof output === 'string' ? output.trim() : '';
  if (feature === 'schema') {
    let value;
    try { value = JSON.parse(text); } catch { /* Invalid JSON remains a failed assertion. */ }
    const contentPassed = !!value && !Array.isArray(value)
      && value.ok === true && Object.keys(value).length === 1;
    return { contentPassed, formatPassed: contentPassed, featurePassed: contentPassed };
  }
  if (feature === 'vision') {
    const formatPassed = /^red\s*,\s*blue[.!]?$/i.test(text);
    let object;
    try { object = JSON.parse(text); } catch { /* Not JSON; CSV is checked separately. */ }
    const contentPassed = formatPassed || (!!object && !Array.isArray(object)
      && object.left === 'red' && object.right === 'blue');
    return { contentPassed, formatPassed, featurePassed: contentPassed };
  }
  const contentPassed = (feature === 'basic-response' && text === 'PRODUCTION_OK')
    || (feature === 'reasoning' && text === '42')
    || (feature === 'tool-roundtrip' && typeof expected === 'string'
      && expected.length > 0 && text === expected);
  return { contentPassed, formatPassed: contentPassed, featurePassed: contentPassed };
}

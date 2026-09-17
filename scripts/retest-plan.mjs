// Offline planning only. No credentials, provider calls, or runner imports.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FEATURES = ['basic-response', 'tool-roundtrip', 'schema', 'reasoning', 'vision'];
const STATUSES = new Set(['passed', 'failed-acceptance', 'inconclusive', 'inconclusive-interrupted', 'upstream-rejected', 'blocked-synthetic-preflight', 'blocked-baseline-not-passed']);

export function buildRetestPlan(report) {
  if (!Array.isArray(report?.cases) || !report.cases.length || report.cases.length > 10000) throw Error('A bounded case dataset is required');
  const indices = new Set(), identities = new Set();
  const candidates = report.cases.map(row => {
    const identity = JSON.stringify([row.model, row.feature]);
    if (!Number.isSafeInteger(row.index) || row.index < 0 || indices.has(row.index) || identities.has(identity)) throw Error('Invalid or duplicate case identity');
    if (typeof row.model !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(row.model) || !FEATURES.includes(row.feature)) throw Error('Invalid exact model or feature');
    if (!Number.isSafeInteger(row.maxOutputTokens) || row.maxOutputTokens <= 0 || !Number.isSafeInteger(row.expectedForwards) || row.expectedForwards <= 0) throw Error('Missing finite positive historical bounds');
    if (!Array.isArray(row.attempts) || !row.attempts.length || row.attempts.some(a => !STATUSES.has(a?.status))) throw Error('Missing or unknown attempt outcome');
    indices.add(row.index); identities.add(identity);
    const statuses = new Set(row.attempts.map(a => a.status));
    return { row, passing: statuses.has('passed'), conflicting: statuses.size > 1 };
  }).sort((a, b) => a.row.index - b.row.index);
  const controls = new Set(FEATURES.map(feature => candidates.find(c => c.row.feature === feature && c.passing && !c.conflicting)?.row.index).filter(index => index !== undefined));
  const cases = candidates.filter(c => !c.passing || c.conflicting || controls.has(c.row.index)).map(({ row, passing, conflicting }) => ({
    caseIndex: row.index, model: row.model, feature: row.feature,
    reasons: [...(!passing ? ['no-passing-attempt'] : []), ...(conflicting ? ['conflicting-outcomes'] : []), ...(controls.has(row.index) ? ['positive-control'] : [])],
    repetitions: conflicting ? 3 : 1,
    historicalBounds: { maxOutputTokens: row.maxOutputTokens, expectedForwards: row.expectedForwards },
  }));
  return {
    schemaVersion: 1, dispatchAllowed: false, paidRequestsMade: 0,
    sourceDatasetSha256: createHash('sha256').update(JSON.stringify(report)).digest('hex'),
    digestPolicy: 'SHA-256 of JSON.stringify(parsed source dataset), not the original file bytes',
    historicalCases: candidates.length, selectedCases: cases.length,
    unresolvedCases: candidates.filter(c => !c.passing).length,
    conflictingCases: candidates.filter(c => c.conflicting).length,
    controlCases: controls.size,
    plannedAttempts: cases.reduce((sum, row) => sum + row.repetitions, 0),
    limits: { automaticRetries: false, raiseOutputCapsAutomatically: false, newAuthorizationAndReservationsRequired: true },
    observationAxes: ['host-identity-and-exit', 'request-contract', 'transport-status', 'accounting-completeness', 'feature-meaning', 'output-format'],
    recipes: {
      'basic-response': { requiresJson: false, criterion: 'Plain-text sentinel; do not conflate response transport with JSON compliance' },
      'tool-roundtrip': { criterion: 'Real nonce-bearing read, paired tool-result payload and returned file value' },
      schema: { requiresJson: true, criterion: 'Strict schema on wire and independent output validation' },
      reasoning: { provesReasoningQuality: false, criterion: 'Record effort transmission, reported reasoning usage and answer correctness separately' },
      vision: { separateMeaningFromFormatting: true, criterion: 'Known image bytes; independently record meaning/order and requested format' },
    },
    qualification: 'Proposal only. New recipes or changed bounds are new experiments, not retroactive passes. Current availability, prices and cumulative reservations require independent review.',
    cases,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length > 3) throw Error('Usage: node scripts/retest-plan.mjs [public-campaign.json]');
  const source = process.argv[2] ?? new URL('../docs/TEST-CAMPAIGN-2026-09-16.json', import.meta.url);
  console.log(JSON.stringify(buildRetestPlan(JSON.parse(readFileSync(source, 'utf8'))), null, 2));
}

#!/usr/bin/env python3
"""Validate the public campaign's structure/counts, not private runtime evidence."""
import collections
import json
from pathlib import Path
import re
import sys


def validate(report):
    cases = report['cases']
    summary = report['summary']
    indices = [case['index'] for case in cases]
    assert len(indices) == len(set(indices)), 'Duplicate case index'
    assert all(case['attempts'] for case in cases), 'Case lacks an outcome'
    counts = collections.Counter()
    for case in cases:
        assert set(case) == {'index', 'model', 'feature', 'maxOutputTokens', 'expectedForwards', 'attempts', 'hasPassingAttempt', 'hasConflictingStatuses'}
        assert [a['attemptOrdinal'] for a in case['attempts']] == list(range(1, len(case['attempts']) + 1))
        statuses = {a['status'] for a in case['attempts']}
        assert case['hasPassingAttempt'] == ('passed' in statuses)
        assert case['hasConflictingStatuses'] == (len(statuses) > 1)
        for attempt in case['attempts']:
            assert set(attempt) == {'attemptOrdinal', 'status', 'recordedAtUtc', 'forwarded', 'accountingComplete', 'evidenceSha256'}
            assert attempt['status'] in {'passed', 'failed-acceptance', 'inconclusive', 'inconclusive-interrupted', 'upstream-rejected', 'blocked-synthetic-preflight', 'blocked-baseline-not-passed'}
            assert all(re.fullmatch('[0-9a-f]{64}', h) for h in attempt['evidenceSha256'].values())
            if attempt['status'] == 'passed':
                assert attempt['accountingComplete'] is True
                assert attempt['forwarded'] > 0
                assert {'metadata.json', 'result.json', 'receipts.json', 'requests.json'} <= set(attempt['evidenceSha256'])
            counts[attempt['status']] += 1
    assert summary['recordedCases'] == summary['plannedCases'] == len(cases)
    assert summary['pendingCases'] == 0
    assert summary['recordedAttempts'] == sum(counts.values())
    assert summary['duplicateAttempts'] == sum(counts.values()) - len(cases)
    assert summary['attemptStatuses'] == dict(counts)
    assert summary['casesWithPassingAttempt'] == sum(c['hasPassingAttempt'] for c in cases)
    assert summary['casesWithConflictingStatuses'] == sum(c['hasConflictingStatuses'] for c in cases)
    assert summary['uniqueModels'] == len({c['model'] for c in cases})
    assert summary['casesByFeature'] == dict(collections.Counter(c['feature'] for c in cases))
    assert summary['passingAttemptsIndependentlyRevalidated'] == counts['passed']
    raw = json.dumps(report)
    for forbidden in ['/root/', '/home/', 'Authorization', 'Bearer ', 'CONCENTRATE_API_KEY', 'amountUsd', 'reportedCostUsd', 'evidenceDirectory']:
        assert forbidden not in raw, 'Private field or path: ' + forbidden
    assert not re.search(r'\b(?:sk|conc|cai)[-_][A-Za-z0-9_-]{20,}', raw), 'Credential-shaped token'
    return summary


if __name__ == '__main__':
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / 'docs/TEST-CAMPAIGN-2026-09-16.json'
    print(json.dumps(validate(json.loads(path.read_text())), indent=2))

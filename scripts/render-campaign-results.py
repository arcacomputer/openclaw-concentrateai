#!/usr/bin/env python3
"""Render a readable matrix from public evidence only; never launch tests."""
import argparse
import collections
import json
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parents[1]
FEATURES = ['basic-response', 'tool-roundtrip', 'schema', 'reasoning', 'vision']


def render(report):
    runpy.run_path(str(ROOT / 'scripts/verify-campaign-report.py'))['validate'](report)
    rows = {}
    for case in report['cases']:
        key = (case['model'], case['feature'])
        assert key not in rows, 'Multiple planned cases for one model/feature'
        rows[key] = case
    models = sorted({c['model'] for c in report['cases']})
    lines = ['# Per-model feature outcomes', '',
             'Generated from [the final public dataset](TEST-CAMPAIGN-2026-09-16.json). See [methodology](TESTING.md) and [the campaign summary](TEST-CAMPAIGN-2026-09-16.md).', '',
             f"Evidence snapshot: `{report['snapshotAtUtc']}`. {len(models)} models; {len(rows)} planned cases.", '',
             'Each cell lists every distinct recorded status, not a best-result selection. Multiple statuses mean conflicting outcomes. `not planned` is not a claim of unsupported behavior. `blocked-*` means the planned case was recorded but did not clear its prerequisites. A pass is bounded to this feature fixture and runtime, not general model certification.', '',
             '| Model | Basic response | Tool roundtrip | Schema | Reasoning | Vision |',
             '| --- | --- | --- | --- | --- | --- |']
    for model in models:
        values = []
        for feature in FEATURES:
            case = rows.get((model, feature))
            values.append(' / '.join(sorted({a['status'] for a in case['attempts']})) if case else 'not planned')
        lines.append('| `' + model + '` | ' + ' | '.join(values) + ' |')
    conflicts = [c for c in report['cases'] if c['hasConflictingStatuses']]
    lines += ['', '## Conflicting cases', '',
              'Counts below refer to attempts for the same case. A later pass does not erase an earlier non-pass.', '',
              '| Case | Model | Feature | Attempt statuses |', '| ---: | --- | --- | --- |']
    for case in conflicts:
        counts = collections.Counter(a['status'] for a in case['attempts'])
        text = ', '.join(f'{status}: {count}' for status, count in sorted(counts.items()))
        lines.append(f"| {case['index']} | `{case['model']}` | {case['feature']} | {text} |")
    assert len(conflicts) == report['summary']['casesWithConflictingStatuses']
    lines += ['', 'Regenerate with `python3 scripts/render-campaign-results.py`; verify without writes using `python3 scripts/render-campaign-results.py --check`.', '']
    return '\n'.join(lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    report = json.loads((ROOT / 'docs/TEST-CAMPAIGN-2026-09-16.json').read_text())
    content = render(report)
    output = ROOT / 'docs/TEST-RESULTS.md'
    if args.check:
        if not output.exists() or output.read_text() != content:
            raise SystemExit('Per-model results are stale; regenerate them.')
        print('Per-model results match the public dataset.')
    else:
        output.write_text(content)
        print('Rendered', report['summary']['uniqueModels'], 'models.')

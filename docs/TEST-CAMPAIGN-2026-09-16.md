# Installed-plugin test campaign: 2026-09-16

Snapshot: `2026-09-16T07:36:36.881672+00:00`.

**All 717 planned cases are accounted for. This is not an all-pass result or universal compatibility certification.**

- 540 unique cases have at least one passing attempt.
- 12 cases have conflicting statuses across attempts and require review.
- 875 recorded attempts, including 158 additional attempts for already-recorded cases.
- 176 distinct models across the planned cases.

[Full per-case and per-attempt matrix](TEST-CAMPAIGN-2026-09-16.json). Duplicate attempts do not inflate unique coverage; prior failures are retained.

## Exact tested artifact

Installed package: `concentrate-provider@1.2.0`; [tested source](https://github.com/arcacomputer/openclaw-concentrateai/commit/0043409b4273a37e12e80f526a5b94e47df27906).
Artifact SHA-256: `6b6b13a9e17de626f9c09c199c03d398c8998824ae6dd47a396101d1827b5220`.

Runtime: OpenClaw 2026.9.4, Node 24.16.0, Linux on isolated Blaxel workers. This evidence describes that artifact, not an automatic qualification of the current main-branch package. The main-branch package version and release instructions are unchanged by this documentation update. No registry publication is performed here.

## Attempt outcomes

| Status | Attempts |
| --- | ---: |
| passed | 639 |
| failed-acceptance | 102 |
| inconclusive | 92 |
| inconclusive-interrupted | 1 |
| upstream-rejected | 17 |
| blocked-synthetic-preflight | 1 |
| blocked-baseline-not-passed | 23 |

Counts above describe attempts, not unique models or exclusively passing cases. A later pass does not erase a prior failure.

## Planned cases by feature

| Feature | Cases |
| --- | ---: |
| basic-response | 176 |
| tool-roundtrip | 176 |
| schema | 137 |
| reasoning | 125 |
| vision | 103 |

## Final nine individual sandbox tests

| Model | Feature | Outcome |
| --- | --- | --- |
| glm-4.5 | reasoning | passed |
| muse-spark-1.3-contributor | schema | passed |
| muse-spark-1.1 | schema | passed |
| llama-3.2-3b-instruct | tool-roundtrip | inconclusive |
| mistral-medium-3 | vision | passed |
| devstral-2 | tool-roundtrip | upstream-rejected |
| ministral-3-14b | tool-roundtrip | failed-acceptance |
| ibm-granite-micro | tool-roundtrip | inconclusive |
| nova-micro | tool-roundtrip | failed-acceptance |

All nine individual workers completed their assigned attempt. Their downloaded live checkpoint hashes and provider-side deletion were verified. The twelve-worker acceleration batch also has verified cleanup. Older duplicate-test workers were still active at this snapshot, so this document does not claim campaign-wide resource shutdown.

## Interpretation and remaining work

- `passed`: the bounded feature acceptance and receipt checks passed for that attempt, not every possible use of the model.
- `failed-acceptance`: the attempt did not meet the feature assertion; this alone does not identify whether the defect belongs to the plugin, host, upstream route, or model.
- `inconclusive` / `inconclusive-interrupted`: insufficient or ambiguous evidence, output/forward limits, timeout, or interrupted execution. Do not interpret these as confirmed incompatibility.
- `upstream-rejected`: the upstream request was rejected. The response is not a feature pass.
- `blocked-synthetic-preflight` / `blocked-baseline-not-passed`: a prerequisite blocked the planned case. These cases are accounted for but not claimed as completed live feature tests.
- Eight Grok models remain quarantined after historical output-bound violations. The non-chat utility `redact-v1` is excluded. These are outside this 717-case plan, not certified by it.
- Original output and request bounds remain part of the test definition. Reasoning or multi-turn cases can be inconclusive under those limits.
- Review conflicting attempts, diagnose non-pass outcomes, and perform any explicitly scoped retests before making stronger compatibility claims.

## Evidence verification and privacy

Before export, all 639 passing attempts were independently revalidated against retained actual requests, terminal receipts, feature assertions, and terminal host execution records. This is offline verification of recorded runs, not new inference.

The JSON exports only allowlisted identifiers, outcomes, bounds, timestamps where recorded, and evidence hashes. Missing timestamps stay null. Raw prompts, responses, account details, private filesystem paths, credentials, and financial ledgers are excluded. Hashes of private evidence provide identity, not public reproducibility or signed attestation. Historical reports remain unchanged.

Run `python3 scripts/verify-campaign-report.py` from a checkout to validate the public matrix's structure, duplicate accounting, status totals, and forbidden private-field checks. This consistency check does not rerun inference or independently authenticate the private evidence hashes.

# Changes and evidence

This history separates product changes from test infrastructure. It does not imply registry publication. See [release gates](docs/RELEASE-GATES.md) for distribution status and [testing](docs/TESTING.md) for evidence boundaries.

## 1.2.0 source candidate

Implemented in commits [2f28501](https://github.com/arcacomputer/openclaw-concentrateai/commit/2f28501) and [0043409](https://github.com/arcacomputer/openclaw-concentrateai/commit/0043409), now incorporated into main with their original Git history preserved.

### Product improvements

- **Full eligible fallback catalog.** Expanded the bundled metadata from GPT-4.1 Mini alone to all 184 eligible chat models in the dated 185-ID snapshot. `redact-v1` remains excluded. This adds metadata coverage, not universal feature support.
- **Live-first discovery.** Configured models consult live metadata even when bundled. A valid live catalog that removes a model is not overridden by stale fallback data; unavailable/malformed metadata can still use the dated fallback.
- **Browsable models.** Added `openclaw concentrate models`, filtering, JSON output and optional refresh with live/bundled/stale labels. Listing does not rewrite the installed package or enable paid inference.
- **Guided setup.** Added interactive model selection, route-pricing review, explicit rate estimates and confirmation before saving. Supports 1–16 selections per invocation within the 256-model configuration limit.
- **Reviewed headless setup.** Added read-only previews and an exact review-token requirement for apply, alongside estimate acknowledgement. Native config mutation uses the original source hash to reject stale writes and reads back saved estimates.
- **Preserved operator configuration.** Setup preserves primary selection, credentials, unselected estimates and existing model parameters. It adds only missing entries to an existing allowlist, updates selected manual cost fields, and refuses conflicting legacy-plugin/custom-endpoint configurations. No automatic gateway restart.
- **Explicit unknown pricing.** Missing rates require an operator estimate; they do not become zero. Suggestions are published base-route/TTL estimates, not tier ceilings or guaranteed charges.
- **Catalog maintenance.** Added retained metadata provenance, generated model documentation, validation and deliberate refresh commands. Historical smoke outcomes remain historical rather than being retroactively promoted.

### Testing and campaign improvements

These are improvements to the **verification system**, not new production-plugin spending controls:

- Credential-free synthetic preflight followed by bounded live forwarding through the installed host.
- Actual request, tool-result and terminal-receipt validation instead of treating HTTP success as feature success.
- Supervisor regression fixes and lock retention through final state persistence.
- Drain-at-worker-boundary transitions, preserving accepted requests and previous evidence.
- Isolated parallel state and accounting, followed by deterministic aggregation of unique cases and separate duplicate attempts.
- Incomplete-accounting stop conditions and retained unknown reservations rather than guessed reconciliation.
- Explicit conflicting-outcome reporting, downloaded checkpoint verification and provider cleanup records.
- Sanitized public case/attempt data, a readable per-model matrix and an offline consistency checker.

### Final recorded campaign

717 planned cases across 176 models are accounted for in 889 attempts. 542 cases have at least one passing attempt; 15 have conflicting statuses. All three parallel batches have verified cleanup. Blocked and inconclusive cases count as accounted-for outcomes, not successful live execution. See the [final report](docs/TEST-CAMPAIGN-2026-09-16.md).

### Still not claimed

Universal model compatibility, general reasoning/vision quality, host-enforced strict JSON validation, exact billing reconciliation, a hard spending cap, signed build provenance, or a new registry release. Non-pass outcomes and conflicts remain open verification work.

## 1.1.0 verified distribution

Introduced package/plugin identity `concentrate-provider` while preserving provider/model prefix `concentrate/`. Retained verified registry publication, fresh installation, migration and rollback evidence. Do not enable it alongside historical plugin ID `concentrate`. See [release 1.1.0](docs/RELEASE-1.1.0.md).

## Historical 1.0.x

Native Responses integration and representative tools/context, vision, schema and reasoning evidence remain in the historical release and feature documents. Earlier failures, quarantines and unknowns are preserved. Version 1.0.1 was a metadata/documentation update, not a new all-model certification. See [release 1.0.x](docs/RELEASE-1.0.0.md).

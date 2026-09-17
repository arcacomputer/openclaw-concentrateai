# How this integration was tested

The [final campaign report](TEST-CAMPAIGN-2026-09-16.md) accounts for 717 planned cases across 176 models. It is a bounded installed-plugin experiment, not a benchmark proving every model works. Start with the [readable per-model matrix](TEST-RESULTS.md); the [JSON](TEST-CAMPAIGN-2026-09-16.json) retains every recorded attempt.

For the next campaign, use the [precision review](PRECISION-REVIEW-2026-09-16.md) and `node scripts/retest-plan.mjs`. The planner is offline and cannot dispatch requests. The historical assertions below describe what actually ran; they are not silently replaced by the revised feature recipes.

The separate [1.2.1 qualification](PRODUCTION-QUALIFICATION-1.2.1.json) records 27 passing installed embedded-runtime cases across two models. Its [release report](RELEASE-1.2.1.md) separates gateway verification, current-source checks and registry-release gates. Do not combine those results with the historical totals below or describe a documentation-only repack as the exact earlier live-tested archive.

## What actually ran

The tested artifact was `concentrate-provider@1.2.0`, built from source commit `0043409b4273a37e12e80f526a5b94e47df27906`. Workers ran Linux, Node 24.16.0 and OpenClaw 2026.9.4. The package was installed into disposable OpenClaw state. These were not direct API calls substituted for plugin tests.

The path was:

```text
installed plugin + native OpenClaw agent
    -> loopback capture/validation proxy
    -> fixed HTTPS Concentrate Responses endpoint
    -> streamed response + actual read-tool execution where required
    -> host output, feature assertions and receipt validation
```

The loopback proxy observed the host's real requests. Its synthetic phase used fixture responses without the paid credential. The live phase forwarded authorized requests to Concentrate. The real credential belonged to the forwarding boundary, not the synthetic child agent. This exercises installed-plugin behavior with controlled transport instrumentation; it is not a production-gateway or all-operating-system test.

## Three distinct layers of evidence

1. **Source and synthetic tests.** Provider registration, catalog projection, pricing/setup validation, stream framing, tool payloads, cancellation and error paths. Tests are under `test/`; historical catalog RED/GREEN evidence is in [catalog-improvement-proof.json](catalog-improvement-proof.json).
2. **Native host/package checks.** Plugin loading, catalog registration, package allowlists and setup interaction with the real host. See `scripts/host-registration-proof.mjs`, `scripts/verification/setup-1.2.0.mjs`, `scripts/verification/setup-pty-1.2.0.mjs` and earlier release records. A script's presence is not itself evidence that every scenario passed.
3. **Bounded live feature attempts.** Actual Concentrate forwarding, returned output, per-forward receipts and terminal host process state. This is the 717-case campaign. Synthetic success does not promote a live failure to a pass.

## What each feature case asserts

| Feature | Planned cases | Acceptance and limits |
| --- | ---: | --- |
| Basic response | 176 | Request the JSON object `{"ok":true}` and independently check the parsed output. No tool access. Not a general language-quality benchmark. |
| Tool roundtrip | 176 | Allow only `read`; read a freshly generated value from a fixture file, verify it is present in the next actual tool-result request, then require the returned text to match. Two bounded forwards. |
| Strict schema | 137 | Verify strict schema configuration reached the Responses `text.format` field, then independently validate the returned object. Requesting strict schema is not proof that the host enforces it. |
| Reasoning | 125 | Verify `reasoning.effort=low` on the wire and the expected output under the case's output cap; retain reasoning usage. This does not require positive reasoning-token usage or measure reasoning quality. |
| Vision | 103 | Use the real `read` tool on a controlled 256×256 red/blue image; verify image content reaches the model request and require left/right colors in order. Two bounded forwards. Not general vision reliability. |

All cases have explicit output-token and forward bounds in the public JSON. Capability-specific planning uses the dated metadata, not assumptions that every model supports every feature. There are 185 catalog IDs, 184 eligible chat models and 176 models in this campaign: the redaction utility `redact-v1` is excluded, and eight Grok models remain quarantined after historical output-bound violations. A missing feature case means **not planned**, not automatically unsupported.

Parallel tool calls and conversation replay have separate historical representative evidence. They are not additional all-model features hidden inside this 717-case total.

## Gates before and after a paid forward

- Pin source, package, runtime, model and case identity.
- Run credential-free synthetic preflight and inspect actual request payloads, tools and skills. The host must not gain unplanned tools or bundled skills.
- Disable model fallbacks and host retry paths; enforce an independent maximum-forward count at the proxy. Host configuration alone is not the enforcement boundary.
- Measure request sizes and establish per-turn input/image and output bounds. Reserve conservatively before dispatch, using applicable route/tier evidence. Unknown pricing is not zero.
- Restrict live forwarding to the expected HTTPS origin without redirects. Bound timeouts, response bytes and SSE frames.
- Parse semantic terminal receipts and validate usage before allowing another forward. A normal downstream close after terminal consumption is different from cancellation; a contradictory terminal event remains a failure.
- Require terminal host execution, feature acceptance and complete validated accounting before classifying a pass. HTTP 200 or exit code 0 alone is insufficient.
- Persist checkpoints before proceeding. Download evidence before deleting a worker and verify provider-side absence afterward.

Receipt checks are not account-invoice reconciliation. Incomplete accounting stopped affected lanes, and unknown reservations were retained. No account spending guarantee is implemented by the plugin.

## How we parallelized the campaign

The serial run drained at a new-worker boundary rather than cancelling an accepted request. Four isolated lanes then partitioned the outstanding cases. With explicit operator approval for overlapping paid tests, twelve additional lanes accelerated coverage. The final nine missing cases each received its own sandbox.

Each lane had separate state, checkpoints and accounting. Earlier results were inherited as baseline evidence, not counted again as new attempts. The aggregator counted unique case IDs once and retained additional attempts separately. An affected lane stopping did not silently mark its remaining assignments passed; later batches covered the missing cases.

The final aggregate contains **889 attempts for 717 unique cases**, including **172 duplicate attempts**. **542 cases have at least one pass**, and **15 cases have differing statuses across attempts**. Those categories can overlap. No best-result selection erased an earlier failure.

All three parallel batches have terminal coordinator records with verified cleanup and no owned workers remaining. A coordinator can exit nonzero because one lane stopped, while another campaign later supplies the missing case evidence. Batch-local coverage is not the combined total.

## How to read outcomes

- `passed`: that attempt met the bounded feature and receipt assertions.
- `failed-acceptance`: the feature assertion failed. Attribution to model, route, host or plugin still needs diagnosis.
- `inconclusive` / `inconclusive-interrupted`: insufficient or ambiguous evidence; not a confirmed incompatibility.
- `upstream-rejected`: upstream refused the request; not a feature pass.
- `blocked-synthetic-preflight` / `blocked-baseline-not-passed`: a prerequisite blocked the case. Recorded coverage includes these cases, but they are not completed live feature tests.

The full plan is accounted for; not every planned case successfully executed live. Failed, blocked and inconclusive cases still need review. Duplicate conflicts remain visible.

## Reproduce the non-paid checks

Use the supported runtime in a bounded disposable host, with no production credentials or gateway state:

```sh
npm run check
npm test
npm run test:transport
npm run catalog:verify
python3 scripts/verify-campaign-report.py
```

`npm run catalog:verify` checks retained generated catalog files. `npm run catalog:check` additionally checks current upstream metadata and can change with the upstream catalog. `npm run catalog:refresh` deliberately rewrites the snapshot; it is not needed to validate this historical campaign.

The public report checker verifies counts, duplicates, status flags, hash shapes and forbidden fields. It does **not** rerun inference or authenticate private evidence. Before final publication, all **647 passing attempts** were revalidated offline against retained actual requests, terminal receipts, feature observations and terminal execution records.

For new live testing, obtain separate credentials and explicit scope, prepare synthetic fixtures, establish a fresh bounded ledger that preserves any prior obligations, and follow [AGENTS.md](../AGENTS.md). The verification scripts include environment-specific harness paths and historical assumptions; they are not a turnkey unattended launcher. Do not run them against production state or interpret their historical budget values as new spend authorization.

## Publication and reproducibility boundary

The public dataset is allowlisted: case identifiers, feature bounds, outcomes, recorded timestamps and hashes of retained evidence. It excludes raw private prompts/responses, credentials, account data, private paths and financial ledgers. Private evidence hashes establish identity, not independently reproducible public attestation.

At the `9be5801` reconciliation, eleven runtime/package files were compared byte-for-byte against the campaign's tested source and retained installed tarball; see [that historical identity proof](source-reconciliation.json). Subsequent code changes have separate [precision verification](precision-proof-2026-09-16.json) and do not inherit an exact-artifact all-model verdict. Repacking after code or documentation changes produces a different artifact digest. No new registry release is implied.

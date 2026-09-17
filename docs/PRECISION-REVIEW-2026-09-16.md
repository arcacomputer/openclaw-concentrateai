# Precision review: code, documentation and the next campaign

Base reviewed: `9be5801e5c1dce08344f52d91fdb5c822b60bba3`. This is a focused correctness pass, not a comprehensive security certification or another all-model inference run. Historical campaign outcomes remain unchanged.

## Findings addressed

### 1. Interactive setup did not settle its pending question on EOF

`src/cli.mjs` handled SIGINT but not the readline `close` event. Closing input at the model filter prompt left an unresolved top-level await; the reproduced child exited 13 instead of the documented cancellation path.

The CLI now aborts a pending question when input closes. It removes that listener before its own normal cleanup, so invalid selections remain errors rather than being mislabeled as cancellations. The subprocess regressions exercise the real CLI/readline implementation with synthetic metadata and assert zero writes. Native installed-host verification is a separate evidence layer.

### 2. A test adapter inferred billing errors from arbitrary output

`scripts/openclaw-live-adapter.mjs` scanned stdout/stderr for `402`, `payment required` or `insufficient credit`. A successful synthetic host response containing a token count of 402 was incorrectly marked `payment-required`.

The adapter no longer invents HTTP status from text. Failed host execution remains `unknown` without captured transport evidence, which still stops the matrix. The orchestration regression for an explicitly supplied transport 402 continues to enforce its stop. Model-generated text and warning prose cannot establish billing status.

This adapter is not the exact per-feature proxy used for the 717-case campaign. The fix does not retroactively reclassify any historical result.

### 3. The README refresh broke existing packaging/documentation checks

The prior documentation update changed the expected package-version marker and introduced repository-relative links in the registry-facing README. The full source suite caught this. The initial precision pass restored the marker and absolute links without weakening the test. A subsequent registry read established that 1.2.0 was already published; the README now identifies 1.2.1 as the source candidate and 1.2.0 as the registry release. See the separate [1.2.1 report](RELEASE-1.2.1.md) for later qualification.

## Areas reviewed without speculative changes

- Provider registration and native Responses routing.
- Live-first catalog projection, inactive IDs, fallback behavior and cancellation.
- Public metadata/pricing origins, byte/time limits and explicit unknown estimates.
- Setup preview, review token, native source-hash mutation, preservation and readback.
- Package allowlists, version/README checks and reproduction scripts.
- Feature acceptance criteria, output/forward bounds, duplicate accounting and report publication.

No custom inference transport or automatic retry system was added to the plugin. Broad provider/model failures cannot safely be attributed to plugin code just from the historical status labels.

## Why the next tests must change

The historical basic-response fixture asked for JSON, overlapping the separate schema test. A reasoning case checked low-effort configuration and JSON output; it did not measure reasoning quality. The vision fixture required exact color formatting. These are useful bounded observations, but a formatting failure is not automatically a failed transport or failed perception.

The historical bounds were 512 output tokens for basic/tool/schema/vision cases and 1024 for reasoning. Larger caps may help some models, but that is a changed experiment and a new spending bound, not permission to silently retry until green.

## No-spend retest planner

Run from a checkout:

```sh
node scripts/retest-plan.mjs
node scripts/retest-plan.mjs docs/TEST-CAMPAIGN-2026-09-16.json
```

The planner:

- selects every case with no passing attempt and every conflicting case;
- adds one consistently passing control per represented feature when available;
- proposes three independent observations for conflicts, one for other selected cases;
- preserves historical IDs and output/forward bounds for comparison;
- emits a deterministic dataset digest and explicit reasons for each selection;
- sets `dispatchAllowed:false`, does not load credentials, and makes no network requests.

Proposed repetitions are not automatic retries or paid execution authorization. Review current availability, pricing, bounds and a cumulative ledger before a separate runner executes anything. The plan does not extend the eight-model Grok quarantine or the old plan to new model IDs.

The [generated plan](RETEST-PLAN-2026-09-16.json) selects **192 cases across 111 models**, proposing **222 attempts**. It includes all 175 cases without a passing attempt, all 15 conflicting cases (these sets overlap), and five clean historical controls. Feature totals are 23 basic, 90 tool, 13 schema, 24 reasoning and 42 vision cases. Selection was independently reconciled against the unchanged campaign JSON.

## Required evidence for each future attempt

Record these dimensions separately, using a new immutable attempt ID:

1. **Setup and host:** installed package/source/harness identity, config validity, selected provider/model, terminal process status and exit code.
2. **Request contract:** actual endpoint, payload, feature options, allowed tools/skills, forward count and input/output bounds.
3. **Transport:** observed HTTP status and terminal Responses event. Do not infer these from model prose.
4. **Accounting:** complete receipt/usage evidence or an explicit unknown with its reservation retained. Invoice reconciliation is separate.
5. **Feature meaning:** plain-text response, actual file value, independently validated JSON schema, reasoning request/usage observations, or image meaning.
6. **Formatting:** record format compliance separately when the feature has a formatting requirement.

Useful reason codes for the next runner include `output-budget-exhausted`, `upstream-rejected`, `rate-limited`, `accounting-unverified`, `host-execution-failed`, `request-contract-mismatch`, `feature-assertion-failed`, and `format-mismatch`. These are design requirements for new evidence, not invented annotations applied to old attempts.

### Feature-specific protocol

- **Basic response:** use a plain-text sentinel, not JSON. Keep schema compliance in its own case.
- **Tools:** require a real nonce-bearing file read and correctly paired tool-result payload. A plausible-looking answer alone does not pass.
- **Schema:** record strict settings on the wire and independently validate the returned object.
- **Reasoning:** distinguish “effort option transmitted,” “reasoning usage reported,” and answer correctness. None by itself proves general reasoning quality.
- **Vision:** use known image bytes and separately score color/order meaning versus requested formatting. A relaxed semantic check must be a new named test, not a retroactive pass.

Keep a same-budget comparison first. Any model-specific larger-output experiment requires a separately reviewed plan, reservation and linked new attempt. A resolved transport issue does not erase a previous feature failure.

## Historical verification of the initial precision candidate

- **60/60 source tests**, including the new regressions; **8/8 synthetic transport tests**.
- Syntax and retained catalog checks passed. The planner passed three tests included in the source total and ran on the actual historical dataset.
- The newly packed artifact was installed into disposable OpenClaw 2026.9.4 state on Node 24.16.0. All **13 packaged files** matched the candidate tree.
- Native headless preview, reviewed apply, stale-review refusal and preservation of the primary model, environment references, unrelated costs and memory passed.
- Real terminal decline/save/Ctrl-C/EOF paths passed. Ctrl-C and EOF returned **130** with configuration unchanged.
- Both sequential 8 GiB workers were deleted and provider absence verified. The first worker's incomplete late-stage proof is retained; the final worker completed the final gates independently.

The [machine-readable proof](precision-proof-2026-09-16.json) binds that initial uncommitted candidate by file/artifact hashes, not by pretending its base commit contains the fixes. Later version/documentation changes do not match that earlier pack; its file-match assertion describes the recorded execution, not today's tree. Source installation reported `provenance-invalid` and used explicit local-source acceptance flags; it is not registry trust certification. That initial pass made no paid model requests. The later 27-case 1.2.1 qualification has its own [evidence](PRODUCTION-QUALIFICATION-1.2.1.json); neither record implies registry publication.

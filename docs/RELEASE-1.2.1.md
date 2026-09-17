# Version 1.2.1 release qualification

Status: source candidate for GitHub publication. Embedded-runtime qualification and gateway text smoke passed. **Not published to ClawHub or npm.** Registry-install and distribution qualification remain separate release gates.

This patch fixes safe end-of-input cancellation in setup and corrects test-harness billing classification. New acceptance checks separate plain responses from JSON, controlled image content from formatting, and reasoning configuration from quality. See the [support contract](PRODUCTION-SUPPORT.md).

## Correction to the earlier distribution record

A direct authenticated publisher check and public registry read on 2026-09-16 established that `concentrate-provider@1.2.0` was already published. Its artifact SHA-256 is `6b6b13a9e17de626f9c09c199c03d398c8998824ae6dd47a396101d1827b5220`, matching the original campaign artifact, with source `0043409b4273a37e12e80f526a5b94e47df27906` and clean registry scan. Earlier source-reconciliation documentation incorrectly treated 1.1.0 as the latest publication. That documentation error is not evidence that the newer local precision fixes shipped. Immutable 1.2.0 is preserved; the fixes require 1.2.1.

## Completed runtime qualification

The installed candidate artifact is SHA-256 `88fc47de47eccf0f37d839484e607e62d7d0e1d7568eb3515f8d473f8e7ac4df`. It was built from the dirty candidate on parent `9be5801`; the parent SHA alone is not its source identity. The [qualification record](PRODUCTION-QUALIFICATION-1.2.1.json) includes the source archive, package-file and harness digests.

On Linux, Node 24.16.0 and OpenClaw 2026.9.4:

| Model | Basic/streaming | File tool | Strict schema | Controlled vision | Reasoning configuration |
| --- | --- | --- | --- | --- | --- |
| `gpt-4.1` | 3/3 | 3/3 | 3/3 | 3/3 | Not in profile |
| `gemini-2.5-flash` | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |

These **27/27 embedded-runtime cases** made 39 upstream forwards. On 2026-09-17, all 453 retained raw-evidence file hashes were independently rechecked, and the feature outputs, request identities, terminal Responses events and bounded usage/cost receipts were revalidated. Historical failures elsewhere in the catalog are unchanged. Three observations are not a reliability/SLA guarantee; Gemini reasoning checks prove low-effort parameter compatibility and a deterministic answer, not reasoning quality.

The subsequent [gateway RPC smoke](GATEWAY-QUALIFICATION-1.2.1.json) passed once for each model, with two additional upstream forwards. It checked a real running gateway, the RPC envelope/run ID, no local fallback, exact provider/model, streaming and the plain-text sentinel. Both gateway and CLI child processes lacked the real paid credential. This is gateway **text** evidence, not a repeat of every feature through the gateway.

Each live case had credential-free actual-host preflight, durable reservation before forwarding, captured requests and receipts, and a fixed upstream origin. Workers were bounded and their deletion independently verified. Reported API receipts are not final invoice reconciliation; prior ambiguous reservations remain retained.

## Source checks and artifact boundaries

The original 1.2.1 qualification passed 65 source tests, eight synthetic transport tests, native headless setup, real-terminal save/decline/Ctrl-C/EOF, installed equality for all 13 packed files and ClawHub validation with zero issues/warnings. [Initial precision-review evidence](precision-proof-2026-09-16.json) records an earlier 60-test stage; it is not the final suite count.

The README was subsequently corrected to distinguish published 1.2.0 from source-only 1.2.1. That documentation-only package change creates a new archive digest. The final source verification must compare every packed file with the live-tested candidate, allowing only the declared README change, and rerun source, transport, native setup and package checks. It must not relabel the new archive as the exact one used for the live campaign.

An earlier 2026-09-17 clean-room run passed 65 then-current source tests and the transport/package checks, then stopped during setup because the verifier incorrectly required the live catalog to equal the bundled snapshot. Live discovery correctly returned 186 models, including new `inkling` and `qwen3.8-flash`, versus 184 bundled models. The current verifier compares against independently fetched and validated current public metadata. Historical failed-stage evidence remains unchanged.

The corrected final run completed on 2026-09-17 at 04:48:30 UTC, with terminal exit 0. It ran native setup first, then **67/67 source tests**, **8/8 synthetic transport tests**, ten repetitions of the five focused cancellation/classification regressions, syntax checks, catalog-snapshot verification, the golden offline retest plan and six actual-host synthetic success/error/timeout/descendant-containment cases. Headless preview/apply/stale-review refusal and real-terminal save/decline/Ctrl-C/EOF all passed. All **13 installed files** matched; ClawHub package validation reported zero issues and warnings. No paid inference was needed. Provider-side worker deletion and unchanged unrelated inventory were verified.

The final package SHA-256 is `d92dc7d5002d29dea2efa7f11811b4b2a15cf2e5dbc79320ba6a0792045d6d44`. Every packed file was compared against the retained live-tested artifact: **only README.md differs**. The source archive SHA-256 is `54db78ac574dcb5b0690dc5f2223145908db6012d8739dcc63732e907c15dd48`. The [final source-verification record](SOURCE-VERIFICATION-1.2.1.json) binds every checked source file, commands/results, package bytes and retained evidence. It also records a fresh hash recheck of 453 embedded-runtime and 38 gateway evidence files. Local archive installation reported `provenance-invalid` under explicit source-acceptance flags; it is not registry trust certification.

After the remote proof, only this release report was updated and the source-verification JSON was added. Both are outside the installed package; no runtime, test, harness or packed file changed. GitHub's CodeQL check is separate from the full suite executed on Blaxel. Registry qualification remains outstanding.

## Remaining distribution gates

- Explicit ClawHub release authorization and a current publication dry run.
- Publish a new immutable 1.2.1 archive, verify publisher identity, terminal scan state and public artifact digest.
- Fresh unauthenticated native registry installation, migration and rollback evidence for that exact distribution.

GitHub source publication does not satisfy those registry gates. The current public registry remains 1.2.0, with clean scan state and the historical artifact hash reverified on 2026-09-17. No new npm or ClawHub release is claimed.

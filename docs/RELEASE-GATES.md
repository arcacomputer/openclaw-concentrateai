# Release gates

Current source: **concentrate-provider 1.2.1 candidate**. The [1.2.1 release report](RELEASE-1.2.1.md) tracks each current gate and the [support contract](PRODUCTION-SUPPORT.md) defines the deliberately limited qualification profile. A direct registry read on 2026-09-16 corrected the earlier status: **1.2.0 is published**, with a clean scan and artifact matching the historical campaign. The [1.1.0 release report](RELEASE-1.1.0.md), [exact distribution evidence](CLAWHUB-RELEASE-1.1.0.json), [migration/rollback guide](MIGRATING.md) and [1.0.1 gates](RELEASE-GATES-1.0.1.md) remain historical evidence, not current patch qualification.

The final [1.2.0 campaign](TEST-CAMPAIGN-2026-09-16.md) accounts for 717 planned cases across 176 models, with non-pass outcomes and conflicts preserved. It does not establish 1.2.1 compatibility. Fresh exact-package qualification, authorized publication and registry-install readback are required for the patch.

## Verified 1.1.0 release (historical distribution evidence)

- **Identity: passed.** GitHub renamed in place. ClawHub's owner name-repair dry run returned admin-only, so the authorized new-package fallback uses plugin ID `concentrate-provider`. The provider/model prefix remains `concentrate/`.
- **Code: passed.** New identity regressions reproduced RED against the previous source. All 41 package checks passed; provider implementation/model data remain unchanged.
- **Synthetic transport: passed.** Eight checks, zero failures. These are not live upstream cancellation/billing tests.
- **Package: passed.** Exact eight-file MIT tarball, real SDK import, zero-issue/zero-warning ClawHub validation and successful dry run.
- **Distribution: passed.** Authorized publisher `felirami`, terminal published attempt, clean ClawScan and TruffleHog, and public artifact matching the tested digest.
- **Registry installation: passed.** Fresh unauthenticated installation without `--force`; new plugin enabled/loaded with provider `concentrate`; all eight installed files matched.
- **Native catalog: passed.** Configuration, model selection and refresh returned the configured GPT-4.1 Mini as available. Synthetic credential only; no paid inference.
- **Migration/rollback: passed.** Disabled old plugin, installed new package, copied and read back the exact cost configuration, preserved model IDs and synthetic memory sentinel, and restored the original plugin on rollback. No production state changed.
- **Containment: passed.** Both sequential bounded Blaxel workers independently verified absent after evidence download. Previous unknown charge reservations retained.

## Trust and coverage limits

The community/source-linked package is **not signed build provenance**. ClawHub reports `hasProvenance: false`; the native `provenance-invalid` diagnostic remains in the exact proof. Its cause is not established.

The earlier representative live feature results are inherited evidence for unchanged provider code, not a fresh paid inference campaign. The original model and feature matrices retain all failures, inconclusives, untested rows and quarantines. No claim covers every model, upstream route, operating system, image interpretation, schema enforcement or exact billing.

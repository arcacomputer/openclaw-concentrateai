# Version 1.2.0 historical release and campaign

**Corrected registry status, checked 2026-09-16:** ClawHub already publishes 1.2.0 with a clean scan and the exact campaign artifact below. Earlier documentation incorrectly called 1.1.0 the latest registry release. This readback corrects that statement; it does not retrospectively claim a fresh registry-install test. The later local precision fixes are not in immutable 1.2.0 and require the separate [1.2.1 qualification](RELEASE-1.2.1.md). No npm release is claimed.

## What is included

The full eligible fallback catalog, live-first metadata discovery, model browsing, guided setup, reviewed headless apply, explicit pricing estimates and configuration-preserving native writes. See [the changelog](../CHANGELOG.md) and [README](../README.md).

## Historical campaign identity

- Source: [`0043409b4273a37e12e80f526a5b94e47df27906`](https://github.com/arcacomputer/openclaw-concentrateai/commit/0043409b4273a37e12e80f526a5b94e47df27906).
- Installed artifact: `concentrate-provider@1.2.0`.
- Artifact SHA-256: `6b6b13a9e17de626f9c09c199c03d398c8998824ae6dd47a396101d1827b5220`.
- Verified campaign environment: Linux, Node 24.16.0, OpenClaw 2026.9.4.
- The `9be5801` reconciliation matched the campaign runtime/package files to the retained artifact; see [that file-by-file proof](source-reconciliation.json). Later changes have separate [precision verification](precision-proof-2026-09-16.json). A new pack is not the old campaign archive.

## Evidence and limitations

- [Catalog regression proof](catalog-improvement-proof.json): retained RED/GREEN and source-suite evidence with scope and hashes.
- [How we tested](TESTING.md): installed-host pipeline, synthetic/live boundaries, exact feature assertions and parallel isolation.
- [Final campaign](TEST-CAMPAIGN-2026-09-16.md): 717 recorded cases, 889 attempts, 542 cases with a passing attempt, 15 with conflicting statuses.
- [Per-model results](TEST-RESULTS.md) and [machine-readable attempts](TEST-CAMPAIGN-2026-09-16.json).

The complete plan is accounted for, but some cases were blocked, rejected, failed or inconclusive. This is not universal compatibility certification. No new live tests were run solely to publish this documentation/source reconciliation.

## Gates for the next patch release

1. Review unresolved non-pass outcomes and conflicts; make any resulting support claims explicit and narrow.
2. Freeze 1.2.1 and pack it anew, since runtime and documentation changed the packaged bytes. Do not overwrite 1.2.0.
3. Run source, synthetic transport, native setup/installation and package checks on that exact candidate in a bounded disposable host.
4. Validate and dry-run with current ClawHub tooling, preserve trust diagnostics and obtain the applicable publication authorization.
5. Publish, verify registry scans and artifact identity, then perform a fresh registry installation and readback.

Use the [publication checklist](CLAWHUB-PUBLISHING.md). Updating GitHub alone does not satisfy those distribution gates.

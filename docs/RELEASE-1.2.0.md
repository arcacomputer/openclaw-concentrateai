# Version 1.2.0 source candidate

**Source and test evidence, not a registry-release announcement.** The last verified distribution documented here is [1.1.0](RELEASE-1.1.0.md). No new ClawHub/npm publication is claimed by this update.

## What is included

The full eligible fallback catalog, live-first metadata discovery, model browsing, guided setup, reviewed headless apply, explicit pricing estimates and configuration-preserving native writes. See [the changelog](../CHANGELOG.md) and [README](../README.md).

## Tested identity

- Source: [`0043409b4273a37e12e80f526a5b94e47df27906`](https://github.com/arcacomputer/openclaw-concentrateai/commit/0043409b4273a37e12e80f526a5b94e47df27906).
- Installed artifact: `concentrate-provider@1.2.0`.
- Artifact SHA-256: `6b6b13a9e17de626f9c09c199c03d398c8998824ae6dd47a396101d1827b5220`.
- Verified campaign environment: Linux, Node 24.16.0, OpenClaw 2026.9.4.
- Current runtime/package files match the retained tested artifact and source; see [the file-by-file identity proof](source-reconciliation.json). Updated README content changes any newly packed tarball's digest; it is not the old tested archive.

## Evidence and limitations

- [Catalog regression proof](catalog-improvement-proof.json): retained RED/GREEN and source-suite evidence with scope and hashes.
- [How we tested](TESTING.md): installed-host pipeline, synthetic/live boundaries, exact feature assertions and parallel isolation.
- [Final campaign](TEST-CAMPAIGN-2026-09-16.md): 717 recorded cases, 889 attempts, 542 cases with a passing attempt, 15 with conflicting statuses.
- [Per-model results](TEST-RESULTS.md) and [machine-readable attempts](TEST-CAMPAIGN-2026-09-16.json).

The complete plan is accounted for, but some cases were blocked, rejected, failed or inconclusive. This is not universal compatibility certification. No new live tests were run solely to publish this documentation/source reconciliation.

## Before a registry release

1. Review unresolved non-pass outcomes and conflicts; make any resulting support claims explicit and narrow.
2. Freeze the release candidate and pack it anew, since documentation changed the packaged bytes.
3. Run source, synthetic transport, native setup/installation and package checks on that exact candidate in a bounded disposable host.
4. Validate and dry-run with current ClawHub tooling, preserve trust diagnostics and obtain the applicable publication authorization.
5. Publish, verify registry scans and artifact identity, then perform a fresh registry installation and readback.

Use the [publication checklist](CLAWHUB-PUBLISHING.md). Updating GitHub alone does not satisfy those distribution gates.

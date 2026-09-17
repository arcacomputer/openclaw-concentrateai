# Production support contract

Support is versioned and narrower than the model catalog. The [1.2.1 release report](RELEASE-1.2.1.md) is authoritative for which gates have actually passed. An unfinished release candidate is not production-qualified.

## Qualification profile

Target: Linux, Node 24.16.0, OpenClaw 2026.9.4, native `openai-responses` transport, plugin ID `concentrate-provider`. Do not enable the historical `concentrate` plugin at the same time.

The initial candidates are `gpt-4.1` and `gemini-2.5-flash`. The source candidate has three passing observations per applicable feature and a separate text-only gateway smoke; see the [qualification record](PRODUCTION-QUALIFICATION-1.2.1.json) and [gateway record](GATEWAY-QUALIFICATION-1.2.1.json). Registry-release admission still requires the remaining distribution gates. Admission requires three fresh passing attempts for each applicable feature on the exact installed release artifact, with zero unresolved attempts in that profile:

- Basic response and streaming: a plain-text sentinel, completed terminal response, exact provider/model identity and valid bounded usage. JSON formatting is not a basic-response requirement.
- Tool roundtrip: the actual host reads an unpredictable disposable file; its value must appear in the next request and final answer. A guessed constant does not pass.
- Structured output: the actual request contains strict `text.format` schema settings and the returned JSON independently satisfies the exact fixture schema. Consumers must still validate every output.
- Vision: a known 256×256 red/blue image is returned by the actual read tool, reaches the request as image input, and yields the correct left/right colors. Requested CSV formatting is a separate observation; correct explicit left/right JSON can establish color content, not CSV compliance. This does not qualify general image understanding.
- Reasoning, Gemini only: low effort must be captured on the wire and a simple deterministic answer returned. This checks parameter compatibility, not reasoning quality. Inclusive reasoning usage must remain inside the output limit.

The profile excludes broad all-model support, load/soak/SLA guarantees, hosted search, arbitrary external tools, general vision/reasoning accuracy, parallel-tool/replay certification, other host versions and other operating systems. Gateway-path and registry-install evidence must be identified separately from local embedded-agent tests.

Catalog entries outside a qualified profile remain available for deliberate evaluation. Historical failures, conflicts and Grok cap-violation quarantines are not erased or turned into passes by narrower qualification. Configure only the models you intend to use; visible metadata is not a guarantee of account access or compatibility.

## Operational checks

1. Back up OpenClaw configuration and state before updating. Keep the last known-good artifact and its digest.
2. Verify the installed plugin version, registered provider `concentrate`, acknowledged per-model estimates and selected `concentrate/<model>` ID. Setup never silently switches the primary model or restarts a gateway.
3. Set account/key limits with Concentrate. Plugin cost estimates and test reservations are not production spending enforcement. No automatic top-up is enabled by this package.
4. Validate application outputs. Treat authentication, billing, throttling, incomplete output, unknown dispatch and missing usage as distinct conditions. Do not infer HTTP 402 from a token count or model prose.
5. Preserve failed/ambiguous requests before deciding to retry. Disabling fallback models is not proof that the host cannot retry or continue an incomplete response.
6. Use an application timeout and inspect runtime diagnostics. Synthetic failure tests prove fixture containment, not real upstream cancellation or bill reconciliation.
7. Restore the backed-up configuration and previously verified package if qualification or your own smoke test fails. Never enable two provider plugins with the same provider ID.

## Evidence boundaries

The new precision protocol is additive. It does not rescore the 717-case historical matrix. Public reports expose allowlisted outcomes, versions and hashes; raw requests, credentials and account ledgers stay private. Registry scans and matching file bytes do not constitute signed build provenance.

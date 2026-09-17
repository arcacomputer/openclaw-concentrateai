# Concentrate.ai for OpenClaw

An MIT-licensed provider plugin maintained by [Arca Computer](https://arca.computer). Connect OpenClaw to Concentrate's Responses API with streaming, tools, reasoning, structured output and image input, where the selected upstream model supports them.

**Version 1.2.1.** Source candidate, not yet released on ClawHub. The current registry release is **1.2.0**, verified on 2026-09-17. See the [1.2.1 verification report](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/RELEASE-1.2.1.md) for exact artifact identities and completed checks. No npm release is claimed; `private: true` prevents accidental npm publication.

AI-assisted development, human stewardship by Luis Felipe Abarca. This is an independent integration, not an endorsement by Concentrate or the OpenClaw Foundation.

## What improved

- Bundled fallback metadata for all **184 eligible chat models**, with live metadata taking precedence over the dated snapshot.
- Model browsing and filtering with explicit live/bundled/stale labels.
- Guided setup and reviewed headless apply, with complete cost estimates and no silent primary-model change or gateway restart.
- Native configuration writes that preserve unrelated settings, reject stale review plans and verify saved estimates.
- A final **717-case test record** across 176 models, retaining failures and conflicting duplicate attempts rather than advertising an all-pass result.

Read [what changed](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/CHANGELOG.md), [how we tested](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TESTING.md), and [results by model](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TEST-RESULTS.md).

## Install

The verified target is **OpenClaw 2026.9.4, Node 24.16.0, Linux**. Other host versions and operating systems have not been verified. Start in disposable state before changing an existing agent.

### Registry distribution

The command currently installs **1.2.0**, not the 1.2.1 source changes below. Check the installed version against the release report before using it in production; a source checkout and a published archive are different artifacts.

```sh
openclaw plugins install clawhub:concentrate-provider --accept-capabilities
openclaw plugins list --json
```

Review the code first: `--accept-capabilities` grants the plugin's declared capabilities. The registry command above does not require `--force`. Installation alone does not configure credentials or start inference. A clean registry scan and matching artifact hashes are not a signed build-provenance attestation; see the release report for the host's trust diagnostics.

### Testing a source candidate

Review a checkout, use disposable OpenClaw state, and follow [the source/package verification workflow](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TESTING.md). A local source installation uses:

```sh
openclaw plugins install --force --accept-capabilities /absolute/path/to/reviewed/checkout
openclaw plugins list --json
```

The flags explicitly accept a reviewed local candidate. They are not advice to bypass warnings on unfamiliar code. The historical campaign below describes its pinned artifact, not every later source change. Only an exact-version release report establishes distribution verification.

### Existing installations

This is a new package, not an automatic rename or update of `openclaw-concentrate`. The plugin ID is now `concentrate-provider`; the provider/model prefix remains `concentrate/`. Existing IDs such as `concentrate/gpt-4.1-mini` are unchanged, but identity preservation is not a new compatibility claim. **Do not enable both plugins.** Back up your configuration and follow the [migration instructions](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/MIGRATING.md) before replacing an existing installation. The old release remains available.

## Configure

Provide `CONCENTRATE_API_KEY` through OpenClaw's supported environment, secret or provider-auth configuration. Never put a key in this repository or in the plugin's cost configuration. API-key onboarding preserves an existing primary model.

### Guided setup

These commands require **1.2.0 or later**. The **1.2.1 source candidate** adds safe end-of-input cancellation; that fix is not in the current registry release. Setup does not run inference.

```sh
openclaw concentrate models --filter claude
openclaw concentrate setup
```

The wizard lets you filter/select models, inspect route pricing, review all four estimates and explicitly confirm saving. It preserves your primary model, credentials, unselected model estimates and existing model parameters. It does not restart the gateway or send inference. Select up to 16 models per invocation, within the 256-model configuration limit.

Headless preview and apply, without editing JSON:

```sh
openclaw concentrate setup --model gpt-4.1 --cache-write 2 --dry-run --json
# Review the rates and copy the returned plan.reviewToken:
openclaw concentrate setup --model gpt-4.1 --cache-write 2 --apply --acknowledge-estimates --review <review-token> --json
```

Suggestions use the highest published **base** route/TTL rates, not tier ceilings or guaranteed bills. If a rate is missing, supply your estimate with `--input`, `--output`, `--cache-read` or `--cache-write`; use the same flags in preview and apply. Unknown rates never become zero automatically. An outdated review token or changed configuration is refused. Preview reads public metadata only. Nothing is saved on cancellation.

Ctrl-C or end-of-input at a setup prompt cancels with exit code 130. Invalid selections remain errors with exit code 1; normal prompt cleanup must not turn a validation error into a cancellation.

Existing explicit model allowlists gain only the selected missing entries; an unrestricted model catalog stays unrestricted. Existing manual `models.providers.concentrate.models` cost fields for selected models are updated consistently. Other manual model fields are preserved; custom endpoint overrides require review instead of being silently changed.

### Manual configuration (still supported)

In `plugins.entries["concentrate-provider"].config`, acknowledge and provide your own complete cost estimates:

```json
{
  "acknowledgeEstimatedCosts": true,
  "costOverrides": {
    "gpt-4.1": {
      "input": 2,
      "output": 8,
      "cacheRead": 0.5,
      "cacheWrite": 2
    }
  }
}
```

All rates are **USD per million tokens**. This example uses base input/output/cache-read rates observed for GPT-4.1 on 2026-09-16, plus **an explicit user estimate of 2 for cache write**, which was not published for these routes. Review current pricing and replace these estimates for your workload. This is not a vendor quote or a spending limit. Set account/key limits in Concentrate separately.

After configuring credentials and estimates, select `concentrate/gpt-4.1` with OpenClaw's model picker or `openclaw models set concentrate/gpt-4.1`. For production, configure only models/features qualified in the current release report. The remaining catalog is available for explicit evaluation, not implicitly production-supported.

Up to **256 exact, unprefixed Concentrate model IDs** can be configured. Every model needs all four finite, nonnegative rates: `input`, `output`, `cacheRead`, `cacheWrite`. Missing prices are never silently turned into zero. Explicit zero is accepted only as your acknowledged estimate. Configured model names display `[user cost estimate]`.

Only configured models become runnable. The dated fallback bundles metadata for **all 184 eligible models** in the 185-ID snapshot, not just GPT-4.1 Mini. `redact-v1` is excluded as a redaction utility. Runtime discovery prefers current public metadata, with the host's five-second timeout and sixty-second cache, even when a model is in the fallback. Credentials are not sent to public metadata endpoints. Empty, malformed or unavailable metadata falls back to configured bundled models; a valid live catalog never resurrects missing models. Catalog visibility is not account entitlement.

Browse the [complete model directory](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/MODELS.md) for current limits, advertised capabilities and preserved historical test outcomes. `openclaw concentrate models --refresh --json` labels live versus bundled data; it never rewrites the installed package.

## Supported behavior and limits

Production qualification is deliberately narrower than the catalog: see the [support contract and operational checks](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/PRODUCTION-SUPPORT.md). It requires fresh installed-package results, repeated feature checks, and exact registry installation. Historical failures remain failures, including for models outside the qualified profile.

- **Text and streaming:** native OpenClaw `openai-responses` transport, without a second custom inference client.
- **Tools:** tool calls and results use the host's standard Responses representation. Parallel-tool and conversation-replay evidence is reported separately from single-tool checks.
- **Reasoning:** use a reasoning-capable model and OpenClaw's thinking settings. GPT-5 Mini has live evidence; that does not certify every reasoning route.
- **Structured output:** set `agents.defaults.models["concentrate/<model-id>"].params.response_format` to an OpenAI-style strict `json_schema` object. The host maps it to Responses `text.format`. **Validate the returned JSON yourself:** requesting a schema is not host-side enforcement.
- **Images:** no speculative image-role rewrite is installed. GPT-4.1 Mini correctly identified a 256×256 red/blue image returned by OpenClaw's actual `read` tool. Earlier 16×16 single-color tests failed, and other-model controls were inconsistent. Image content reaching the API does not guarantee correct perception. Do not use this evidence to promise reliable vision across the catalog.
- **Errors and cancellation:** the plugin preserves catalog cancellation. Runtime inference errors, cancellation and retries belong to OpenClaw's transport. Focused synthetic checks are not live upstream cancellation/billing proof. Disabling model fallbacks alone does not disable retries or incomplete-response continuation.
- **Routing and billing:** Concentrate chooses upstream routes. Host token-cost estimates do not incorporate all provider receipt extensions, route fallback, cache TTLs, context tiers, hosted tool charges or BYOK behavior. No hard spending guarantee is implemented by this plugin.

## How we tested it

The separate **1.2.1 candidate qualification** recorded **27/27 passing embedded-runtime cases** on GPT-4.1 and Gemini 2.5 Flash: three repetitions of basic streaming response, real file-tool roundtrip, strict schema and controlled vision on each model, plus three Gemini reasoning-configuration checks. The [qualification record](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/PRODUCTION-QUALIFICATION-1.2.1.json) pins the installed artifact and raw-evidence hashes. Gateway checks, later repacks and registry release gates are reported separately in the [1.2.1 report](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/RELEASE-1.2.1.md). This is a narrow candidate profile, not all-model or registry-release certification.

### Historical 1.2.0 campaign

We installed the pinned 1.2.0 artifact into disposable OpenClaw 2026.9.4 hosts on Linux/Node 24.16.0. Credential-free synthetic preflight checked actual host requests before bounded live forwarding to Concentrate. Tests checked returned content, real tool-result payloads, schema/reasoning settings, image input, terminal process state and usage receipts, not just HTTP success.

The campaign covered 176 basic-response, 176 tool-roundtrip, 137 schema, 125 reasoning and 103 vision cases. Serial execution transitioned to four isolated lanes, then twelve additional lanes with approved overlapping attempts, followed by nine one-case sandboxes for the remaining gaps. Each lane kept separate evidence/accounting; aggregation preserved duplicates and counted unique cases once.

**Final recorded outcomes:** 717/717 planned cases accounted for across 176 models, 889 attempts, 542 cases with at least one passing attempt, and 15 cases with conflicting statuses. All three parallel batches have verified cleanup. “Accounted for” includes blocked and inconclusive cases, not 717 successful live tests. All 647 passing attempts were revalidated against retained evidence before the final export.

The 185-ID catalog includes the excluded `redact-v1` utility and eight quarantined Grok models outside this plan. Reasoning tests are bounded configuration/output checks, not reasoning-quality scores. Vision is a controlled two-color fixture, not general image understanding. Failures and conflicts still require review; neither catalog metadata nor one passing attempt proves universal compatibility.

See [methodology and reproduction boundaries](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TESTING.md), [readable per-model results](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TEST-RESULTS.md), [final report](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TEST-CAMPAIGN-2026-09-16.md), and [every recorded attempt](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/TEST-CAMPAIGN-2026-09-16.json). [Original smoke outcomes](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/compatibility.json) remain unchanged as historical evidence.

## Pricing evidence

Concentrate's aggregate `/v1/models` does not provide complete pricing. The per-model endpoint exposes route-level `providers[provider].pricing`. From a source checkout:

```sh
node scripts/pricing.mjs gpt-4.1-mini /tmp/gpt-pricing.json
```

This read-only helper uses a five-second timeout, one-MiB response limit, no redirects and no credentials. It preserves raw unit rates, tiers, cache TTLs, tool charges, support flags, source URL and timestamp. It does not collapse multiple routes into an invented universal price. Missing cache-write rates stay unknown.

## Development and verification

For a targeted, **no-spend** follow-up plan, run `node scripts/retest-plan.mjs`. It selects unresolved/conflicting historical cases plus positive controls, preserves original bounds, and prints JSON without contacting a provider. It is not a live test launcher or spend authorization. Read the [precision review and next-test rules](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/PRECISION-REVIEW-2026-09-16.md) before starting another campaign.

Run installation and OpenClaw verification in a bounded disposable host, not a production gateway:

```sh
npm test
npm run check
npm run test:transport
npm run catalog:verify
npm run catalog:check
python3 scripts/verify-campaign-report.py
python3 scripts/render-campaign-results.py --check
# To update metadata and regenerate the directory deliberately:
# npm run catalog:refresh
node scripts/verify.mjs /tmp/concentrate-evidence
clawhub package validate . --openclaw-version 2026.9.4 --json
```

Read [AGENTS.md](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/AGENTS.md) before changing the provider. It documents the isolated Blaxel lane, credentials, inference budgets, retained failures, privacy and publication gates. No delegation is required to use Blaxel.

- [Version 1.2 catalog, setup and feature evidence](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/RELEASE-1.2.0.md)
- [Previous release and identity migration](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/RELEASE-1.1.0.md)
- [Original per-model smoke report](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/COMPATIBILITY.md)
- [Feature campaign and historical failures](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/FEATURE-TESTING.md)
- [ClawHub publication procedure](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/CLAWHUB-PUBLISHING.md)
- [Exact Git author/committer timestamps](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/COMMIT-HISTORY.md)
- [Provenance and evidence dates](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/PROVENANCE.md)

Arca maintains this as an independent ClawHub plugin. Built-in OpenClaw inclusion is not a prerequisite or promised outcome. Community guidance motivating that choice is preserved, with its qualifications, in AGENTS.md.

# Concentrate.ai for OpenClaw

An MIT-licensed provider plugin maintained by [Arca Computer](https://arca.computer). Connect OpenClaw to Concentrate's Responses API with streaming, tools, reasoning, structured output and image input, where the selected upstream model supports them.

**Source candidate: 1.2.0. Last verified registry release: 1.1.0.** The tested catalog and guided-setup improvements are now on main; this update does not publish a new registry package. See [1.2.0 evidence and remaining release gates](docs/RELEASE-1.2.0.md). No npm release is claimed; `private: true` prevents accidental npm publication.

AI-assisted development, human stewardship by Luis Felipe Abarca. This is an independent integration, not an endorsement by Concentrate or the OpenClaw Foundation.

## What improved

- Bundled fallback metadata for all **184 eligible chat models**, with live metadata taking precedence over the dated snapshot.
- Model browsing and filtering with explicit live/bundled/stale labels.
- Guided setup and reviewed headless apply, with complete cost estimates and no silent primary-model change or gateway restart.
- Native configuration writes that preserve unrelated settings, reject stale review plans and verify saved estimates.
- A final **717-case test record** across 176 models, retaining failures and conflicting duplicate attempts rather than advertising an all-pass result.

Read [what changed](CHANGELOG.md), [how we tested](docs/TESTING.md), and [results by model](docs/TEST-RESULTS.md).

## Install

The verified target is **OpenClaw 2026.9.4, Node 24.16.0, Linux**. Other host versions and operating systems have not been verified. Start in disposable state before changing an existing agent.

### Registry distribution

The last registry installation verified in this repository is **1.1.0**. The command below does not establish that the 1.2.0 setup commands are available; inspect the installed version.

```sh
openclaw plugins install clawhub:concentrate-provider --accept-capabilities
openclaw plugins list --json
```

Review the code first: `--accept-capabilities` grants the plugin's declared capabilities. The registry command above does not require `--force`. Installation alone does not configure credentials or start inference. A clean registry scan and matching artifact hashes are not a signed build-provenance attestation; see the release report for the host's trust diagnostics.

### Testing the 1.2.0 source candidate

Review a checkout, use disposable OpenClaw state, and follow [the source/package verification workflow](docs/TESTING.md). A local source installation uses:

```sh
openclaw plugins install --force --accept-capabilities /absolute/path/to/reviewed/checkout
openclaw plugins list --json
```

The flags explicitly accept a reviewed local candidate. They are not advice to bypass warnings on unfamiliar code. Main contains the tested runtime implementation, but updated documentation changes newly packed artifact bytes; registry-release verification remains outstanding.

### Existing installations

This is a new package, not an automatic rename or update of `openclaw-concentrate`. The plugin ID is now `concentrate-provider`; the provider/model prefix remains `concentrate/`. **Do not enable both plugins.** Back up your configuration and follow the [migration instructions](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/MIGRATING.md) before replacing an existing installation. The old release remains available.

## Configure

Provide `CONCENTRATE_API_KEY` through OpenClaw's supported environment, secret or provider-auth configuration. Never put a key in this repository or in the plugin's cost configuration. API-key onboarding preserves an existing primary model.

### Guided setup

These commands require the **1.2.0 source candidate**, not the last verified 1.1.0 registry release. Setup does not run inference.

```sh
openclaw concentrate models --filter claude
openclaw concentrate setup
```

The wizard lets you filter/select models, inspect route pricing, review all four estimates and explicitly confirm saving. It preserves your primary model, credentials, unselected model estimates and existing model parameters. It does not restart the gateway or send inference. Select up to 16 models per invocation, within the 256-model configuration limit.

Headless preview and apply, without editing JSON:

```sh
openclaw concentrate setup --model claude-haiku-4-5 --dry-run --json
# Review the rates and copy the returned plan.reviewToken:
openclaw concentrate setup --model claude-haiku-4-5 --apply --acknowledge-estimates --review <review-token> --json
```

Suggestions use the highest published **base** route/TTL rates, not tier ceilings or guaranteed bills. If a rate is missing, supply your estimate with `--input`, `--output`, `--cache-read` or `--cache-write`; use the same flags in preview and apply. Unknown rates never become zero automatically. An outdated review token or changed configuration is refused. Preview reads public metadata only. Nothing is saved on cancellation.

Existing explicit model allowlists gain only the selected missing entries; an unrestricted model catalog stays unrestricted. Existing manual `models.providers.concentrate.models` cost fields for selected models are updated consistently. Other manual model fields are preserved; custom endpoint overrides require review instead of being silently changed.

### Manual configuration (still supported)

In `plugins.entries["concentrate-provider"].config`, acknowledge and provide your own complete cost estimates:

```json
{
  "acknowledgeEstimatedCosts": true,
  "costOverrides": {
    "gpt-4.1-mini": {
      "input": 0.4,
      "output": 1.6,
      "cacheRead": 0.1,
      "cacheWrite": 0.4
    }
  }
}
```

All rates are **USD per million tokens**. This example uses the published base input/output/cache-read rates observed for GPT-4.1 Mini on 2026-09-13, plus **an explicit user estimate of 0.4 for cache write**, which was not published for that route. Review current pricing and replace these estimates for your workload. This is not a vendor quote or a spending limit. Set account/key limits in Concentrate separately.

After configuring credentials and estimates, select `concentrate/gpt-4.1-mini` with OpenClaw's model picker or `openclaw models set concentrate/gpt-4.1-mini`.

Up to **256 exact, unprefixed Concentrate model IDs** can be configured. Every model needs all four finite, nonnegative rates: `input`, `output`, `cacheRead`, `cacheWrite`. Missing prices are never silently turned into zero. Explicit zero is accepted only as your acknowledged estimate. Configured model names display `[user cost estimate]`.

Only configured models become runnable. The dated fallback bundles metadata for **all 184 eligible models** in the 185-ID snapshot, not just GPT-4.1 Mini. `redact-v1` is excluded as a redaction utility. Runtime discovery prefers current public metadata, with the host's five-second timeout and sixty-second cache, even when a model is in the fallback. Credentials are not sent to public metadata endpoints. Empty, malformed or unavailable metadata falls back to configured bundled models; a valid live catalog never resurrects missing models. Catalog visibility is not account entitlement.

Browse the [complete model directory](https://github.com/arcacomputer/openclaw-concentrateai/blob/main/docs/MODELS.md) for current limits, advertised capabilities and preserved historical test outcomes. `openclaw concentrate models --refresh --json` labels live versus bundled data; it never rewrites the installed package.

## Supported behavior and limits

- **Text and streaming:** native OpenClaw `openai-responses` transport, without a second custom inference client.
- **Tools:** tool calls and results use the host's standard Responses representation. Parallel-tool and conversation-replay evidence is reported separately from single-tool checks.
- **Reasoning:** use a reasoning-capable model and OpenClaw's thinking settings. GPT-5 Mini has live evidence; that does not certify every reasoning route.
- **Structured output:** set `agents.defaults.models["concentrate/<model-id>"].params.response_format` to an OpenAI-style strict `json_schema` object. The host maps it to Responses `text.format`. **Validate the returned JSON yourself:** requesting a schema is not host-side enforcement.
- **Images:** no speculative image-role rewrite is installed. GPT-4.1 Mini correctly identified a 256×256 red/blue image returned by OpenClaw's actual `read` tool. Earlier 16×16 single-color tests failed, and other-model controls were inconsistent. Image content reaching the API does not guarantee correct perception. Do not use this evidence to promise reliable vision across the catalog.
- **Errors and cancellation:** the plugin preserves catalog cancellation. Runtime inference errors, cancellation and retries belong to OpenClaw's transport. Focused synthetic checks are not live upstream cancellation/billing proof. Disabling model fallbacks alone does not disable retries or incomplete-response continuation.
- **Routing and billing:** Concentrate chooses upstream routes. Host token-cost estimates do not incorporate all provider receipt extensions, route fallback, cache TTLs, context tiers, hosted tool charges or BYOK behavior. No hard spending guarantee is implemented by this plugin.

## How we tested it

We installed the pinned 1.2.0 artifact into disposable OpenClaw 2026.9.4 hosts on Linux/Node 24.16.0. Credential-free synthetic preflight checked actual host requests before bounded live forwarding to Concentrate. Tests checked returned content, real tool-result payloads, schema/reasoning settings, image input, terminal process state and usage receipts, not just HTTP success.

The campaign covered 176 basic-response, 176 tool-roundtrip, 137 schema, 125 reasoning and 103 vision cases. Serial execution transitioned to four isolated lanes, then twelve additional lanes with approved overlapping attempts, followed by nine one-case sandboxes for the remaining gaps. Each lane kept separate evidence/accounting; aggregation preserved duplicates and counted unique cases once.

**Final recorded outcomes:** 717/717 planned cases accounted for across 176 models, 889 attempts, 542 cases with at least one passing attempt, and 15 cases with conflicting statuses. All three parallel batches have verified cleanup. “Accounted for” includes blocked and inconclusive cases, not 717 successful live tests. All 647 passing attempts were revalidated against retained evidence before the final export.

The 185-ID catalog includes the excluded `redact-v1` utility and eight quarantined Grok models outside this plan. Reasoning tests are bounded configuration/output checks, not reasoning-quality scores. Vision is a controlled two-color fixture, not general image understanding. Failures and conflicts still require review; neither catalog metadata nor one passing attempt proves universal compatibility.

See [methodology and reproduction boundaries](docs/TESTING.md), [readable per-model results](docs/TEST-RESULTS.md), [final report](docs/TEST-CAMPAIGN-2026-09-16.md), and [every recorded attempt](docs/TEST-CAMPAIGN-2026-09-16.json). [Original smoke outcomes](docs/compatibility.json) remain unchanged as historical evidence.

## Pricing evidence

Concentrate's aggregate `/v1/models` does not provide complete pricing. The per-model endpoint exposes route-level `providers[provider].pricing`. From a source checkout:

```sh
node scripts/pricing.mjs gpt-4.1-mini /tmp/gpt-pricing.json
```

This read-only helper uses a five-second timeout, one-MiB response limit, no redirects and no credentials. It preserves raw unit rates, tiers, cache TTLs, tool charges, support flags, source URL and timestamp. It does not collapse multiple routes into an invented universal price. Missing cache-write rates stay unknown.

## Development and verification

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

# Per-model feature outcomes

Generated from [the final public dataset](TEST-CAMPAIGN-2026-09-16.json). See [methodology](TESTING.md) and [the campaign summary](TEST-CAMPAIGN-2026-09-16.md).

Evidence snapshot: `2026-09-16T07:56:52.277989+00:00`. 176 models; 717 planned cases.

Each cell lists every distinct recorded status, not a best-result selection. Multiple statuses mean conflicting outcomes. `not planned` is not a claim of unsupported behavior. `blocked-*` means the planned case was recorded but did not clear its prerequisites. A pass is bounded to this feature fixture and runtime, not general model certification.

| Model | Basic response | Tool roundtrip | Schema | Reasoning | Vision |
| --- | --- | --- | --- | --- | --- |
| `claude-fable-5` | passed | passed | passed | passed | passed |
| `claude-fable-5-1` | passed | passed | passed | passed | failed-acceptance |
| `claude-haiku-4-5` | failed-acceptance | passed | passed | upstream-rejected | passed |
| `claude-opus-4-1` | passed | passed | not planned | upstream-rejected | passed |
| `claude-opus-4-5` | passed | passed | passed | upstream-rejected | passed |
| `claude-opus-4-6` | passed | passed | passed | upstream-rejected | passed |
| `claude-opus-4-7` | passed | passed | passed | passed | failed-acceptance |
| `claude-opus-4-8` | passed | passed | passed | passed | passed |
| `claude-opus-5` | passed | passed | passed | passed | passed |
| `claude-sonnet-4` | passed | failed-acceptance | not planned | upstream-rejected | passed |
| `claude-sonnet-4-5` | passed | passed | passed | upstream-rejected | passed |
| `claude-sonnet-4-6` | passed | passed | passed | upstream-rejected | passed |
| `claude-sonnet-5` | passed | passed | passed | passed | passed |
| `codestral` | passed | failed-acceptance | passed | not planned | not planned |
| `command-a` | passed | failed-acceptance / passed | passed | not planned | not planned |
| `command-a-vision` | inconclusive | blocked-baseline-not-passed | blocked-baseline-not-passed | not planned | blocked-baseline-not-passed |
| `deepseek-r1` | passed | failed-acceptance | not planned | inconclusive | not planned |
| `deepseek-r1-0528` | passed | inconclusive | passed | passed | not planned |
| `deepseek-r1-distill-32b` | passed | failed-acceptance | passed | passed | not planned |
| `deepseek-v3-0324` | failed-acceptance | failed-acceptance | passed | not planned | not planned |
| `deepseek-v3-1` | passed | failed-acceptance | passed | passed | not planned |
| `deepseek-v3-2` | passed | failed-acceptance | passed | passed | not planned |
| `deepseek-v4-1-flash` | passed | passed | passed | passed | passed |
| `deepseek-v4-flash-0423` | passed | passed | passed | passed | not planned |
| `deepseek-v4-flash-0731` | passed | passed | passed | passed | not planned |
| `deepseek-v4-flash-vision-exp` | passed | passed | passed | passed | passed |
| `deepseek-v4-pro` | passed | passed | passed | passed | not planned |
| `deepseek-v4-pro-0813` | passed | passed | passed | passed | not planned |
| `devstral-2` | upstream-rejected | upstream-rejected | blocked-baseline-not-passed | not planned | not planned |
| `gemini-2.5-flash` | passed | passed | passed | passed | passed |
| `gemini-2.5-flash-lite` | passed | failed-acceptance | passed | passed | passed |
| `gemini-2.5-pro` | passed | passed | passed | passed | passed |
| `gemini-3-flash-preview` | passed | inconclusive | inconclusive | passed | passed |
| `gemini-3.1-flash-lite-preview` | passed | passed | passed | passed | passed |
| `gemini-3.1-pro-preview` | passed | passed | passed | passed | passed |
| `gemini-3.5-flash` | passed | passed | passed | passed | passed |
| `gemini-3.5-flash-lite` | passed | passed | passed | passed | passed |
| `gemini-3.6-flash` | passed | passed | passed | passed | passed |
| `gemini-3.7-flash` | passed | passed | passed | passed | passed |
| `gemini-3.8-flash` | passed | passed | passed | passed | passed |
| `gemma-3-12b` | failed-acceptance | inconclusive | passed | not planned | inconclusive |
| `gemma-3-27b` | failed-acceptance | failed-acceptance | passed | not planned | passed |
| `gemma-3-4b` | passed | failed-acceptance | passed | not planned | failed-acceptance |
| `gemma-4-26b` | passed | passed | passed | passed | passed |
| `gemma-4-31b` | passed | passed | passed | passed | passed |
| `gemma-4-e4b` | passed | passed | not planned | passed | not planned |
| `glm-4.5` | passed | inconclusive | not planned | passed | not planned |
| `glm-4.5v` | passed | failed-acceptance | not planned | passed | failed-acceptance |
| `glm-4.6` | passed | passed | passed | passed | not planned |
| `glm-4.6v` | passed | passed | not planned | passed | passed |
| `glm-4.7` | passed | passed | inconclusive | passed | not planned |
| `glm-4.7-flash` | passed | failed-acceptance / passed | passed | passed | not planned |
| `glm-5` | passed | passed | passed | passed | not planned |
| `glm-5.1` | passed | passed | passed | passed | not planned |
| `glm-5.2` | passed | passed | passed | passed | not planned |
| `glm-5.3` | passed | passed | passed | passed | not planned |
| `glm-5.3-flash` | passed | failed-acceptance / passed | passed | passed | passed |
| `gpt-4.1` | passed | passed | passed | not planned | passed |
| `gpt-4.1-mini` | passed | failed-acceptance | passed | not planned | failed-acceptance |
| `gpt-4o` | passed | inconclusive | passed | not planned | passed |
| `gpt-4o-mini` | passed | failed-acceptance | passed | not planned | passed |
| `gpt-5` | passed | inconclusive | passed | passed | inconclusive |
| `gpt-5-mini` | passed | inconclusive | passed | passed | inconclusive |
| `gpt-5-nano` | passed | inconclusive | inconclusive | passed | inconclusive |
| `gpt-5.1` | passed | passed | passed | passed | passed |
| `gpt-5.2` | passed | passed | passed | passed | passed |
| `gpt-5.3-codex` | passed | passed | passed | passed | passed |
| `gpt-5.4` | passed | passed | passed | passed | passed |
| `gpt-5.4-mini` | passed | passed | passed | passed | passed |
| `gpt-5.4-nano` | passed | passed | passed | passed | failed-acceptance |
| `gpt-5.4-pro` | passed | passed | passed | blocked-synthetic-preflight | inconclusive |
| `gpt-5.5` | passed | passed | passed | passed | passed |
| `gpt-5.6-luna` | passed | passed | passed | passed | passed |
| `gpt-5.6-sol` | passed | passed | passed | passed | passed |
| `gpt-5.6-terra` | passed | passed | passed | passed | passed |
| `gpt-6-astra` | passed | passed | passed | passed | passed |
| `gpt-oss-120b` | passed | inconclusive | passed | passed | not planned |
| `gpt-oss-20b` | passed | passed | passed | passed | not planned |
| `gpt-oss-safeguard-120b` | passed | inconclusive | passed | not planned | not planned |
| `gpt-oss-safeguard-20b` | passed | inconclusive | passed | not planned | not planned |
| `hy3` | passed | passed | passed | passed | not planned |
| `ibm-granite-micro` | passed | inconclusive | passed | not planned | not planned |
| `jamba-1-5-large` | passed | failed-acceptance | not planned | not planned | not planned |
| `jamba-1-5-mini` | failed-acceptance | inconclusive | not planned | not planned | not planned |
| `kimi-k2-5` | passed | passed | passed | passed | passed |
| `kimi-k2-6` | passed | inconclusive / passed | passed | inconclusive | failed-acceptance / inconclusive |
| `kimi-k2-7-code` | passed | passed | passed | passed | inconclusive |
| `kimi-k2-thinking` | passed | passed | passed | passed | not planned |
| `kimi-k3` | passed | passed | passed | passed | passed |
| `llama-3-70b-instruct` | passed | failed-acceptance | not planned | not planned | not planned |
| `llama-3-8b-instruct` | passed | failed-acceptance / inconclusive | not planned | not planned | not planned |
| `llama-3.1-70b-instruct` | failed-acceptance | inconclusive | inconclusive | not planned | not planned |
| `llama-3.1-8b-instruct` | passed | inconclusive | not planned | not planned | not planned |
| `llama-3.2-1b-instruct` | passed | failed-acceptance | not planned | not planned | not planned |
| `llama-3.2-3b-instruct` | passed | inconclusive | passed | not planned | not planned |
| `llama-3.3-70b-instruct` | passed | failed-acceptance / inconclusive | passed | not planned | not planned |
| `llama-4-maverick` | passed | failed-acceptance | passed | not planned | failed-acceptance |
| `llama-4-scout` | passed | failed-acceptance / passed | passed | not planned | passed |
| `magistral-small-1.2` | failed-acceptance | failed-acceptance | failed-acceptance | failed-acceptance | not planned |
| `mimo-v2.5` | passed | passed | passed | passed | failed-acceptance / passed |
| `mimo-v2.5-pro` | passed | inconclusive | passed | passed | not planned |
| `minimax-m2` | passed | passed | passed | upstream-rejected | not planned |
| `minimax-m2-1` | passed | passed | not planned | upstream-rejected | not planned |
| `minimax-m2-1-highspeed` | passed | passed | not planned | upstream-rejected | not planned |
| `minimax-m2-5` | passed | passed | not planned | upstream-rejected | not planned |
| `minimax-m2-5-highspeed` | passed | failed-acceptance / passed | not planned | upstream-rejected | not planned |
| `minimax-m2-7` | passed | passed | not planned | passed | not planned |
| `minimax-m2-7-highspeed` | passed | passed | not planned | passed | not planned |
| `minimax-m3` | passed | passed | passed | passed | passed |
| `ministral-3-14b` | failed-acceptance | failed-acceptance | passed | not planned | failed-acceptance |
| `ministral-3-3b` | failed-acceptance | inconclusive | passed | not planned | failed-acceptance |
| `ministral-3-8b` | failed-acceptance | failed-acceptance | passed | not planned | failed-acceptance |
| `mistral-large-3` | failed-acceptance | failed-acceptance / passed | passed | not planned | passed |
| `mistral-medium-3` | passed | passed | passed | not planned | passed |
| `mistral-medium-3.1` | passed | passed | passed | not planned | passed |
| `mistral-nemo` | passed | inconclusive | passed | not planned | not planned |
| `mistral-small-3.1` | passed | failed-acceptance | passed | not planned | not planned |
| `mistral-small-3.2` | passed | failed-acceptance | passed | not planned | passed |
| `muse-glimmer-30b` | inconclusive | blocked-baseline-not-passed | not planned | blocked-baseline-not-passed | blocked-baseline-not-passed |
| `muse-spark-1.1` | passed | inconclusive | passed | passed | inconclusive |
| `muse-spark-1.2` | passed | inconclusive | passed | passed | inconclusive |
| `muse-spark-1.2-contributor` | passed | inconclusive | passed | passed | inconclusive |
| `muse-spark-1.3` | passed | passed | passed | passed | inconclusive |
| `muse-spark-1.3-contributor` | passed | inconclusive / passed | passed | passed | inconclusive |
| `nemotron-3-120b` | passed | passed | passed | passed | not planned |
| `nemotron-3-nano-30b` | passed | passed | passed | passed | not planned |
| `nemotron-3-nano-omni` | passed | passed | passed | passed | passed |
| `nemotron-3-ultra-nvfp4` | passed | passed | passed | passed | not planned |
| `nemotron-lightning-3.5-30b` | passed | passed | passed | passed | not planned |
| `nova-2-lite` | failed-acceptance | passed | not planned | passed | passed |
| `nova-lite` | failed-acceptance | failed-acceptance | not planned | not planned | failed-acceptance / passed |
| `nova-micro` | passed | failed-acceptance | not planned | not planned | not planned |
| `nova-premier` | failed-acceptance | failed-acceptance | not planned | failed-acceptance / passed | passed |
| `nova-pro` | failed-acceptance | failed-acceptance | not planned | not planned | failed-acceptance |
| `o1` | passed | inconclusive | passed | passed | inconclusive |
| `o3` | passed | inconclusive | passed | passed | passed |
| `o3-mini` | passed | passed | passed | passed | not planned |
| `o4-mini` | passed | inconclusive | passed | passed | inconclusive |
| `palmyra-x4` | passed | failed-acceptance | not planned | not planned | not planned |
| `palmyra-x5` | passed | failed-acceptance | not planned | not planned | not planned |
| `qwen-flash` | passed | failed-acceptance | passed | passed | not planned |
| `qwen-plus` | passed | failed-acceptance | passed | inconclusive | not planned |
| `qwen3-14b` | passed | inconclusive | passed | inconclusive | not planned |
| `qwen3-235b-a22b-instruct` | passed | passed | passed | not planned | not planned |
| `qwen3-30b` | passed | inconclusive | passed | passed | not planned |
| `qwen3-32b` | passed | inconclusive | failed-acceptance / passed | passed | not planned |
| `qwen3-coder-30b-a3b` | passed | inconclusive | passed | not planned | not planned |
| `qwen3-coder-480b-a35b` | passed | inconclusive | passed | not planned | not planned |
| `qwen3-coder-flash` | passed | failed-acceptance | not planned | not planned | not planned |
| `qwen3-coder-next` | passed | passed | passed | not planned | not planned |
| `qwen3-coder-plus` | passed | failed-acceptance | not planned | not planned | not planned |
| `qwen3-max` | inconclusive | blocked-baseline-not-passed | not planned | not planned | not planned |
| `qwen3-max-thinking` | passed | passed | not planned | not planned | not planned |
| `qwen3-next-80b-a3b` | passed | passed | passed | not planned | not planned |
| `qwen3-vl-235b-a22b` | passed | passed | passed | not planned | passed |
| `qwen3-vl-30b-a3b` | inconclusive | blocked-baseline-not-passed | blocked-baseline-not-passed | not planned | blocked-baseline-not-passed |
| `qwen3-vl-flash` | passed | failed-acceptance | passed | passed | failed-acceptance |
| `qwen3-vl-plus` | passed | failed-acceptance | passed | inconclusive | failed-acceptance |
| `qwen3.5-122b-a10b` | passed | passed | failed-acceptance | passed | passed |
| `qwen3.5-27b` | passed | passed | passed | passed | passed |
| `qwen3.5-35b-a3b` | passed | passed | passed | passed | passed |
| `qwen3.5-397b-a17b` | inconclusive-interrupted | blocked-baseline-not-passed | blocked-baseline-not-passed | blocked-baseline-not-passed | blocked-baseline-not-passed |
| `qwen3.5-9b` | passed | passed | passed | passed | passed |
| `qwen3.5-flash` | passed | inconclusive | not planned | passed | inconclusive |
| `qwen3.5-plus` | inconclusive | blocked-baseline-not-passed | not planned | blocked-baseline-not-passed | blocked-baseline-not-passed |
| `qwen3.6-27b` | passed | passed | passed | passed | passed |
| `qwen3.6-35b` | passed | inconclusive | inconclusive | passed | inconclusive |
| `qwen3.6-flash` | passed | inconclusive | not planned | passed | inconclusive |
| `qwen3.6-plus` | passed | inconclusive | not planned | passed | inconclusive |
| `qwen3.7-flash` | passed | inconclusive | not planned | passed | inconclusive |
| `qwen3.7-max` | passed | inconclusive | not planned | passed | not planned |
| `qwen3.7-plus` | passed | inconclusive | not planned | passed | inconclusive |
| `qwen3.8-27b` | passed | passed | passed | passed | passed |
| `qwen3.8-max` | passed | passed | passed | passed | inconclusive |
| `qwq-32b` | passed | failed-acceptance | not planned | passed | not planned |
| `step-3-7-flash` | passed | passed | passed | passed | passed |

## Conflicting cases

Counts below refer to attempts for the same case. A later pass does not erase an earlier non-pass.

| Case | Model | Feature | Attempt statuses |
| ---: | --- | --- | --- |
| 2318 | `qwen3-32b` | schema | failed-acceptance: 1, passed: 1 |
| 2355 | `kimi-k2-6` | tool-roundtrip | inconclusive: 1, passed: 1 |
| 2358 | `kimi-k2-6` | vision | failed-acceptance: 1, inconclusive: 1 |
| 2374 | `minimax-m2-5-highspeed` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2388 | `mimo-v2.5` | vision | failed-acceptance: 1, passed: 1 |
| 2412 | `glm-5.3-flash` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2431 | `glm-4.7-flash` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2452 | `muse-spark-1.3-contributor` | tool-roundtrip | inconclusive: 1, passed: 1 |
| 2471 | `llama-4-scout` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2475 | `llama-3.3-70b-instruct` | tool-roundtrip | failed-acceptance: 1, inconclusive: 1 |
| 2482 | `llama-3-8b-instruct` | tool-roundtrip | failed-acceptance: 1, inconclusive: 1 |
| 2484 | `mistral-large-3` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2520 | `command-a` | tool-roundtrip | failed-acceptance: 1, passed: 1 |
| 2531 | `nova-premier` | reasoning | failed-acceptance: 1, passed: 1 |
| 2536 | `nova-lite` | vision | failed-acceptance: 1, passed: 1 |

Regenerate with `python3 scripts/render-campaign-results.py`; verify without writes using `python3 scripts/render-campaign-results.py --check`.

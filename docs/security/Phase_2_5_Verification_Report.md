# Phase 2.5 verification gate — PASS / FAIL / BLOCKED

**Date:** 23 November 2026. Scope: preserve and verify the existing read-only preview; no payments, public fundraising, escrow, token, or contract deployment.

## Verdict

| Gate | Result | Evidence |
|---|---|---|
| Unit + local JSON-RPC integration fixtures | **PASS** | `npm test`: 11 passing tests; synthetic/local fixtures only. |
| Production build + dependency audit | **PASS** | `npm run build` succeeds; `npm audit --omit=dev`: 0 reported vulnerabilities. |
| Local route smoke tests | **PASS** | Vite dashboard `/` and `/campaign.html` returned HTTP 200 in prior verification; Vite static build includes both HTML files. |
| Cursor / bounded scan gap visibility | **PASS (code review)** | Dashboard reports pending confirmed-block lag and cursor/target; scanner advances sequentially in batches, persisting cursor after each scanned block. Not exercised against a live chain. |
| Unsafe HTML from chain data | **PASS (code review)** | Dynamic wallet, event, token metadata, transaction links and campaign content are escaped before HTML interpolation; allowlist address validation. No dedicated XSS browser test. |
| Live RPC chain ID, balance, block height | **BLOCKED** | Sandbox direct TLS to public RPC previously reset; current outbound allowlist does not provide BNB RPC. No live data claimed. |
| Historical transaction compared with BscScan | **BLOCKED** | No live RPC/BscScan read is possible in the environment; no transaction hash is asserted. |
| Known BEP-20 logs compared with BscScan | **BLOCKED** | Synthetic Transfer-log decoding test passes; no live token contract read/log validation performed. |
| Real RPC fallback/timeout | **BLOCKED** | Failure and fallback logic tested with mocked endpoint; no two live RPC providers tested. |
| Live reorg/reload/offline recovery | **BLOCKED** | Cursor/reorg logic is implemented, but no browser-level or real-chain reorg/reload/offline recovery test run. |
| Desktop + mobile browser QA | **BLOCKED** | No browser automation/browser binary is installed in this environment. Responsive styles exist; not visually validated on actual viewports. |
| GitHub push | **PASS after push only** | To be recorded with resulting commit SHA. |
| Vercel deployment | **BLOCKED** | No Vercel CLI, project link/config, token, org/project IDs, or existing GitHub deploy workflow found. No public URL or deployment success is claimed. |

## Scanner range behavior and known gaps

The scan target is the observed latest block minus 12. On first run it starts up to 20 blocks behind that target. Each refresh scans a contiguous range of at most 26 blocks inclusive (start plus a 25-block span); later refreshes resume at `cursor + 1`. Cursor updates occur per successfully scanned block, and failures leave the cursor at the last successful block. Dashboard status reports `cursor`, target, and pending lag; lag is visible rather than silently treated as caught up. A parent mismatch rolls the cursor back to the prior block and retries the missing range on the next refresh. This is client-side, local-storage-only recovery, not proof against provider inconsistency or deep reorgs. No historical backfill beyond the initial 20-block window is automatic.

## Manual live verification (required before claiming live pass)

1. Open the public deployment in a browser with internet access; check that the badge identifies BNB Smart Chain Mainnet and the RPC reports chain ID 56.
2. Compare displayed head height against `https://bscscan.com/` at near-same time; record timestamp and delta.
3. Add an address with a known balance. Compare the balance against its BscScan page at the same block (allow for intervening transfers).
4. For a known historical native transfer, add a participating address and verify a backfill event/hash against BscScan. The default initial range is only about 20 confirmed blocks; older transaction comparison needs a separately controlled cursor/backfill test or BscScan API/indexer.
5. Add a well-known BEP-20 contract only after confirming its BSC contract address on BscScan. Check `symbol`, `decimals`, `balanceOf` and a known `Transfer` event/log against BscScan. Metadata can be malicious; do not treat token inclusion as endorsement.
6. Use devtools offline mode and restore connectivity. Verify visible degraded state, RPC retry, unchanged cursor during failure, and sequential resume. No wallet signatures should be requested.
7. Reload after partial catch-up and confirm local cursor/history persist. Reorg test requires a fork/test chain with controlled alternate blocks; do not simulate a production-chain reorg.
8. Inspect at desktop 1440×900 and mobile 390×844. Keyboard tab through controls; check dialogs, focus, overflow, readable scan-lag status, and reduced-motion behavior.

## Deployability status

`vercel.json` declares Vite build and `dist` output, and the built static output includes both `index.html` and `campaign.html`. This is configuration only, not a deployment. Vercel credentials and project linkage are absent. GitHub is authenticated; only the requested active branch should be pushed. Wait for a verified CI/Vercel deployment URL before publishing it.

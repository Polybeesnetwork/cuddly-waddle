# Architecture

- Vite static single-page app, semantic HTML/CSS, ES modules.
- `app/main.js`: chain reader using public BNB JSON-RPC; viem address validation and wei conversion; local watchlist; UI rendering.
- `app/style.css`: responsive dark design system, reduced-motion support.
- `tests/detection.test.js`: synthetic transaction classification tests.
- Public read endpoint: `https://bsc-dataseed.bnbchain.org`; chain ID is checked at runtime. No secrets. Production should use managed redundant RPC endpoints via a server proxy.
- Explorer evidence links target BscScan. Current monitor scans only up to four newly seen blocks, direct native transfers, while browser is active; no durable data or indexer.
- No contracts, payments, escrow, backend, or personal data store are part of this prototype.

BSC mainnet ID 56 and testnet ID 97; payment recipient is reserved for future, separately authorized use and is not active in this prototype. User wallet connection is optional and read-only account display; no transactions are requested.

## Phase 2 monitor

`app/chain.js` contains an 8-second aborting, minimum-spacing RPC pool with a second public BNB endpoint fallback; chain-ID guard; BNB and BEP-20 event parsing; ERC-20 metadata reads; and receipt helper. `app/main.js` persists watchlist, per-wallet native BNB thresholds, selected token addresses, scanned cursor, recent block hashes and bounded event history in localStorage. First scan is bounded to 20 blocks before a 12-block confirmation buffer, then scans at most 25 blocks per poll. It detects shallow reorgs via saved hashes and parent links. These limits are described in `docs/security/Phase_2_Verification.md`.

`campaign.html` is a local read-only accountability view of these observations. It cannot call inbound transfers contributions or outbound transfers spending without independent labeling evidence. No campaign source of truth or milestones are yet stored.

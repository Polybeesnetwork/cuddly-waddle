# Phase 2 verification record

## Automated evidence

Run `npm test` for 11 tests: address/watch transaction classification, log-index event identity, BEP-20 log decoding, RPC fallback under injected endpoint failure, receipt pending/reorg/canonical-success states, and a local HTTP JSON-RPC integration fixture checking chain ID plus block scan. All fixtures are synthetic. `npm run build` passes. `npm audit --omit=dev` reported zero vulnerabilities at the recorded run. No browser automation was available/run.

## Live-chain status: NOT VERIFIED

The sandbox's direct TLS connection to `bsc-dataseed.bnbchain.org` reset during the earlier live request. BscScan and RPC hosts are also outside the sandbox's direct outbound allowlist; this turn therefore did not validate a real chain ID, balance, historical hash, or explorer-confirmed transaction. Do not treat code or synthetic integration tests as evidence of mainnet connectivity. A reproducible operator check is described below.

## Reproducible operator check

1. `npm install && npm test && npm run build`.
2. Run `npm run dev`; open the app in a browser with network access.
3. Confirm network badge reads BNB Chain Mainnet (chain ID verified by endpoint response), and compare latest block to `https://bscscan.com/`.
4. Add a wallet whose address and public activity you independently know; compare returned balance to BscScan address page at the same block height. Note that explorer's displayed balance may update between queries.
5. Wait for at least 12 blocks after a known direct transfer, inspect the timeline hash on BscScan and compare direction/value/block. The scanner intentionally processes a 12-block confirmation buffer; transactions in the newest 12 blocks are not shown yet.
6. Add a verified BEP-20 contract only after checking the contract's chain/address independently. Compare transfer log and balance with BscScan token transfer page.
7. Simulate endpoint failures in a local harness or devtools to verify fallback/error state. Do not rely on a single browser session for production availability.

## Functional boundary and known gaps

- RPC endpoints: two public BNB dataseed endpoints, sequential failover; 8s per-request abort, 350ms minimum spacing per pool. Public providers can rate-limit, censor, or return inconsistent data.
- Backfill: first monitor run scans up to 20 blocks before the 12-block confirmation boundary; then up to 25 blocks per refresh. Cursor, event history (500 max), and 32 recent block hashes persist in local storage.
- Reorg handling: compares saved block hash with canonical RPC and checks sequential parent hash. Rollback removes the mismatched saved tip and events at/after it, then subsequent refreshes reconcile further. This is shallow, single-provider and browser-local; not a durable chain indexer or consensus proof.
- Native BNB: scans full transactions in blocks. BEP-20: selected contracts' `Transfer` logs and `balanceOf` reads, decimals/symbol metadata are contract-reported and untrusted. Maximum three token addresses, set in browser. Token balances are shown adjacent to BNB.
- Large-outflow threshold: configurable per watch address, default 5 BNB; labels only native outgoing transactions. Threshold is a user preference, not a risk rating.
- Internal transfer means both endpoints are in the local watchlist. No counterparty labeling service exists; all other transactions are merely incoming/outgoing, never called a contribution, vendor payment or verified expense.
- Event receipt helper checks a canonical block hash and receipt status, but is not wired as a backend payment/order reconciliation service. Transfers on chain are included in blocks scanned 12 behind latest; no finalized-tag provider attestation or independent explorer comparison is made.
- No actual milestone records exist; campaign page displays local watchlist-derived transfer observations and explicit disclosure that creator milestone claims are not validated. No campaign funding or escrow enabled.
- No actual mainnet payment, token transfer, account signing, or fund movement has been performed.

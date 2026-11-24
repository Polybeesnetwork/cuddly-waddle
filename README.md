# Beacon Ledger

**Proof before promises.** Beacon Ledger is an early BNB Chain treasury-observability prototype: public native BNB balance snapshots and observed direct transfers, with explorer evidence links. It combines an intentionally modest monitor with a product direction for campaign treasury accountability. It is not a security audit, fraud verdict, custody product, or crowdfunding launch.

## Run locally

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
npm test
npm run build
```

Vite binds to `0.0.0.0` for preview. The app uses a public BNB Chain mainnet RPC and needs internet access. No API keys or `.env` are required. Development transactions are not enabled. The specified treasury address is not automatically added, paid, or represented as controlled by the project.

## Product behavior and limits

- Reads chain ID/latest block and watched addresses' native balance from public BNB RPC.
- Scans at most four recently observed blocks for direct native-value transfers involving watchlist addresses when the page is open; 12-second polling.
- Browser-local watchlist only. No server or database, no BEP-20 event indexer, no mempool, no delegation/allowance monitor, no notification service, no full backfill, no reorg-safe archival record.
- Optional injected wallet connection is user initiated; application makes no signing, approval, or payment request.
- Network badge describes the data endpoint; wallet connection shows its actual chain and does not change the data endpoint.
- A transaction is an observation, not proof of campaign intent or safety.

## Research and safety

- [`docs/market-research.md`](docs/market-research.md)
- [`docs/product/Security_Innovation_Proposals.md`](docs/product/Security_Innovation_Proposals.md)
- [`docs/research/Binance_2026_Incident_Case_Study.md`](docs/research/Binance_2026_Incident_Case_Study.md)
- [`docs/research/Security_Gap_Analysis.md`](docs/research/Security_Gap_Analysis.md)
- [`docs/research/Competitor_Security_Matrix.md`](docs/research/Competitor_Security_Matrix.md)
- [`docs/security/Threat_Model.md`](docs/security/Threat_Model.md)
- [`docs/security/Incident_Replay_Test_Plan.md`](docs/security/Incident_Replay_Test_Plan.md)
- [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)

The incident case study distinguishes company statements, third-party reporting and unresolved questions. Binance's 23 Nov announcement says firms were engaged; it contains no review findings. No independent audit is claimed. No testnet escrow, payments or real-money crowdfunding are implemented. Obtain legal review before public fundraising in Malaysia or elsewhere.

## Branding and token

Beacon Ledger is provisional pending domain/trademark clearance. Name options are in the product strategy. Ticker proposals are speculative only. No native token is recommended or issued.

## Phase 2 update

The monitor now has a secondary public RPC endpoint, request timeout/rate spacing, bounded historical scan, browser-persisted cursor and recent block hashes, shallow reorg reconciliation, direct native transfers, optional BEP-20 `Transfer` logs/balances for up to three user-specified contracts, and configurable native outflow threshold (default 5 BNB). It holds the newest 12 blocks outside the visible timeline as a confirmation buffer. This does **not** equal independent BscScan validation or full finality assurance. Campaign view at `/campaign.html` reports only local observed transfers and clearly disclaims inferred purposes and unverified milestones.

The environment cannot establish a live RPC/BscScan connection. Full verification procedures, synthetic versus real-chain evidence, limitations, and exact scan bounds: [`docs/security/Phase_2_Verification.md`](docs/security/Phase_2_Verification.md).

# Threat model — Beacon Ledger prototype

## Assets and trust boundaries

- Browser-local watchlist (not secret; no server persistence).
- Read-only BNB Chain observations and links.
- User's injected wallet connection, only requested after explicit click; no signing/approval transaction in prototype.
- Public RPC endpoint and explorer are third-party infrastructure.

## Adversaries / failures

Phishing site impersonation; malicious RPC response; RPC outage/rate limiting; deep or shallow reorg; missed blocks while tab sleeps; malformed address input; local storage tampering; browser extension compromise; misleading address labels; token or internal transfer omitted by native-only scanner; malicious campaign creator; compromised operator key; multisig collusion; malicious/buggy escrow contract; legal misuse as investment fundraising.

## Controls implemented

- Address validation via viem `isAddress`; duplicate detection case-insensitively.
- Read-only JSON-RPC; chain ID asserted as 56; no wallet signing path.
- Watchlist stored locally; no account or personal data collection.
- Untrusted address data is not inserted as HTML except constrained validated addresses; rendered observations constructed from RPC values (production should additionally validate all provider fields).
- Explicit labels for live reads, network, data limits, and alert semantics; direct explorer links.
- UI explicitly distinguishes alert from prevention and avoids risk scores.

## Gaps / controls required before production

RPC quorum/provider monitoring; durable event index with reorg handling and idempotency; server-side abuse controls and authenticated team tenancy; safe output escaping; CSP and dependency scanning; wallet chain switch UX and WalletConnect; audit logging/privacy review; verified campaign ownership; on-call routing; signed and versioned policies; contract audit; timelock/multisig operational design; KYC/AML and jurisdictional analysis as applicable. No production payment, escrow, or public fundraising implemented.

## Emergency procedures

This prototype cannot pause chain activity. For a suspicious event, independently verify chain and transaction from another RPC/explorer, contact the wallet's authorized signers through established channels, follow their pre-agreed key rotation / pause / incident response playbook, preserve hashes and timestamps, and seek qualified incident response. Do not send seed phrases or trust unsolicited support.

## Residual risk

An authorized signer can still approve harmful action; a public monitor can be delayed or evaded; policies can be wrong; alerts can be missed; provider and explorer may fail; multisigs can collude; off-chain evidence may be false. No guarantee of protection, and no audit claim.

# Launch Studio prototype

The `launch-studio.html` route is a client-side specification builder for two project concepts: a fixed-supply or holder-burn token and an all-or-nothing/milestone crowdfunding plan. It previews values, autosaves drafts to browser local storage, and downloads a JSON brief. No draft or private information is submitted to a server.

## What this release does not do

- It does not generate/deploy bytecode or connect a wallet.
- It does not issue a token or accept contributions.
- It does not create an escrow contract, payment address, or refund/release mechanism.
- It does not promise that a token can pay BNB Smart Chain gas; BNB remains the default gas asset.

The UI intentionally says preparation mode. The user expressed interest in BSC mainnet token deployment and all crowdfunding scope, but that is not permission to deploy a particular contract or collect funds now: no token config, tested contract, audits, legal review, operational policy, or concrete campaign have been provided.

## Next gates before any on-chain feature

1. Review the competitor references directly and document differentiated workflows without copying their branding, source, or proprietary assets.
2. Confirm supported standard and options. Prefer minimal fixed-supply ERC-20/BEP-20; avoid hidden mint authority, blacklist/tax toggles, honeypot patterns, or unaudited custom code.
3. Select an exact, pinned compiler and audited contract dependency; compile reproducibly, publish source/metadata, run static analysis and independent audit. Test BSC testnet with a wallet confirmation flow and no private-key handling.
4. For crowdfunding, specify beneficiary custody, goal/deadline behavior, refunds, milestone release, dispute handling, fees, and legal operator. Test invariants/fuzzing and independent audit; no mainnet launch until operational/legal review.
5. Only then add a mainnet flow with explicit network/contract/cost preview, wallet simulation, clear irreversible confirmation, and transaction receipt verification. The user must initiate each wallet signature. Never use stored seeds or private keys.

Do not market this prototype as a token factory, audited crowdfund, or a production-ready mainnet deployment product. It is a UI/brief builder only.

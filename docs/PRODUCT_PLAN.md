# Beacon Ledger — product direction and value test

**Decision: keep the product; stop adding disconnected crypto utilities.** The gas planner is a handy secondary utility, but by itself it is not a durable reason to use Beacon Ledger. A generic gas calculator is easy to replace, does not create trust, and cannot make a project token useful for BNB gas. Do not issue a token, invent a “gas token” promise, or add a swap/fundraising flow to manufacture demand.

## Product thesis

**Beacon Ledger helps a BNB Chain project and its community inspect public treasury activity against the project's own published wallet list and statements.** It is a read-only evidence workspace: show what the chain confirms, link every observation to an explorer, separate on-chain facts from project explanations, and make uncertainty visible. The product must not claim to prove wallet ownership, intent, legitimacy, safety, or that every relevant wallet was disclosed.

### Who has the problem

- **Primary user:** a small BNB Chain project operator who already publishes treasury addresses and wants to reduce repeated “where did the funds go?” questions.
- **Second user:** a community member, researcher, or journalist who wants a reproducible view without giving a site custody or connecting a wallet.
- **Job to be done:** “Given the addresses this project says it uses, let me see recent confirmed movements, their transaction evidence, and what the project says about them—without asking me to trust the dashboard.”

A useful experience is the one that reduces time to independently answer a real treasury question. An attractive hero or extra chart is not proof of value.

## Proposed first product: Treasury Evidence Room

A shareable, read-only page organized around one project-defined set of public BNB Chain addresses:

1. **Scope card:** list each address, who supplied/labeled it, when that label was last changed, and what is *not* known. Labels are claims, not verified identities.
2. **Confirmed activity timeline:** native BNB and explicitly supported token transfers with block, confirmation/canonicality state, amount, endpoints, token contract, and direct BscScan links. Never fill missing history with invented/demo data.
3. **Project context:** optional operator notes attached to a transaction or time window, visibly distinct from chain facts and carrying author + timestamp. Do not silently edit past statements.
4. **Completeness and health:** show scan start/end blocks, last successful poll, endpoint status, gaps, supported event types, confirmation buffer, and retention. “No events found” must not be presented as “nothing happened.”
5. **Portable evidence:** export the observed rows and scope as JSON/CSV with retrieval timestamp, chain ID, block hashes and source caveats. Independent users must be able to re-check hashes on an explorer/RPC.
6. **No privileged actions:** no payments, token issuance, swaps, wallet signatures, custody, escrow, donation button, or “verified/safe” badge.

This extends the existing watchlist, BNB scanner, evidence links and campaign-accountability page; it is not a new protocol. Keep the Contract Observatory and Gas Runway as secondary utilities, not the product centre.

## Why this is more valuable than a token or a meme

- It addresses a recurring, inspectable task: checking a treasury movement and its evidence.
- A token does not create this utility and cannot pay BNB Smart Chain gas by default. Issuance adds legal, security, liquidity and trust risk before product-market evidence exists.
- A meme can attract attention, but attention is not retention or evidence of usefulness. If the project later uses a meme for outreach, measure conversion to actual evidence-room use; do not disguise speculation as utility.
- The proposed product has an objective validation test: an independent person can find, verify, and correctly interpret a disclosed transfer without connecting a wallet.

## Validation before more feature work (one week)

1. Interview **5 project operators** who publish treasury addresses and **5 community/research users** who have checked one. Ask for their last real example, current method, time spent, and what they could not verify. Do not pitch first.
2. Ask three operators to provide a public address set and a recent question they have actually received. Use only public data; redact personal data in notes.
3. Build a clickable/static sample from real public chain records (with source links and retrieval time) only after RPC data is independently checked. Label it as sample, never imply a partnership.
4. Run a 10-minute unmoderated task with five people: “Find the latest outgoing transfer and verify it on BscScan; tell us what the page does not establish.” Observe without coaching.
5. Ask whether operators would publish the page and return to update notes. Do not treat likes, token interest, or compliments as demand.

### Continue / stop criteria

**Continue to a narrow MVP only if:** at least 3 of 5 operators agree to pilot a real address set; at least 4 of 5 independent users locate and verify a transfer unaided; at least 4 of 5 correctly understand that listed wallet labels/intent are unverified; and at least 2 operators say they would use it again for their next treasury update.

**Stop or re-scope if:** the main request is custody/payment/fundraising, users interpret the display as an audit or safety score, address provenance cannot be responsibly described, or the product cannot establish scan completeness. Do not compensate for weak demand by issuing a token.

## Build order after validation

### P0 — evidence correctness (must precede public sharing)
- Verify live Chain ID 56 + successful RPC reads from supported environments; implement endpoint health and truthful degraded states.
- Establish scan-range start/end, pagination/backfill guarantees, confirmation and reorg policy, token log coverage and storage limits. Detect and disclose gaps.
- Add deterministic fixtures for duplicate logs, missing blocks, timeouts, 429s, wrong chain, malformed token metadata, and reorgs.
- Add browser tests at desktop/tablet/mobile for navigation, empty/loading/error states, visible evidence, accessibility and export.

### P1 — evidence-room MVP
- Read-only project scope page with address provenance disclosure.
- Filterable confirmed transfer timeline and stable explorer links.
- Clearly separated operator annotations with timestamp/history.
- Export with chain ID, block hashes, query time, scope and limitations.
- No accounts required for readers; no wallet connect requirement.

### P2 — pilot and reliability
- Pilot with two or three consenting projects using public wallets.
- Measure task success, verification rate, time-to-answer, repeat use, scan gaps, false assumptions and support load.
- Add monitored uptime and endpoint failover only after defining truthful source provenance.

### P3 — sustainability (only after value)
- Test voluntary hosted-workspace pricing or sponsorship with operators; keep public evidence independently verifiable and exportable.
- No token sale, token utility promise, fundraising/escrow, or user payment handling in this plan. Any later financial product requires a separate legal, security and product review.

## Non-negotiable product language

Say “observed on this endpoint at this block” rather than “complete,” unless completeness is demonstrated. Say “labeled by the operator” rather than “owned by.” Say “no matching events in this scanned scope” rather than “no activity.” Every error, RPC failure, unsupported token, stale cursor and missing range stays visible. Never show simulated values as live.

## Current honest assessment

The current repository is a promising prototype, not a production treasury monitor: local watchlists, a limited sequential scanner and shallow reorg handling are useful foundations; live RPC accessibility and end-to-end successful-chain browser checks remain unverified. Campaign Accountability is a local-data display, not a fundraiser. Contract Observatory is a basic address snapshot, not an audit. Gas Runway is an estimate, not a quote. None should be marketed as proof of safety or completeness.

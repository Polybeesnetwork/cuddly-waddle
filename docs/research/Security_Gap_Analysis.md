# Security gap analysis

## Capability boundary matrix

| Need | Public-chain data can do | Requires private/other data | Relative value | Prototype position |
|---|---|---|---|---|
| Large treasury outflow alert | Detect confirmed visible transfers; compare to disclosed policy | Mempool, signing queue, key service, reliable rapid alerting | High for small teams | Direct BNB transfers only; foreground polling |
| Authorization / delegation changes | Potentially inspect chain-specific account changes and events | Signing origin, approval context and policy rationale | High where supported | Not implemented; false confidence risk too high without validated BSC semantics |
| Privilege changes | Observe contract events / bytecode changes | Admin console, deployment provenance, private keys | High | Roadmap; requires indexed event monitoring |
| Coordinated wallet outflows | Correlate public transactions heuristically | Exchange data, attribution, cross-chain entity resolution | Medium-high, attribution uncertain | Not implemented |
| Cross-chain fund flow | Read each chain independently | Commercial labels and bridge/indexer coverage | Medium | Explicitly out of scope |
| Campaign accountability | Verify escrow events and public milestone release conditions | Authenticity and quality of off-chain delivery evidence | High | Product architecture; no production escrow yet |
| Incident response | Alert, link evidence, provide timelines | Authority to pause/suspend signing, people on call | High | Alert only, cannot halt |

## Five security concepts ranked

Scores 1–5; higher is better. Cost, risks, feasibility scores reflect product judgment, not measured market data.

| Concept | User value | Feasibility | Cost efficiency | Defensive effectiveness | Differentiation |
|---|---:|---:|---:|---:|---:|
| Campaign treasury firewall + publicly checkable policy | 5 | 3 | 3 | 4 | 5 |
| Small-team treasury change monitor | 4 | 5 | 4 | 2 | 3 |
| Delegation/approval sentinel | 4 | 2 | 3 | 3 | 3 |
| Cross-chain fund-flow intelligence | 3 | 2 | 1 | 2 | 2 |
| Incident replay lab with point-in-time evidence | 3 | 4 | 4 | 2 | 4 |

**Chosen signature:** campaign treasury observability tied to explicit, evidence-linked milestones and transparent release conditions; pair a monitor with deterministic escrow rules only after audit and legal review. This is more distinct than a generic scanner and ties alert context to contributor expectations. Prototype is currently a read-only address monitor, not a security guarantee.

## Five practical improvements (problems are design risks, not universal claims about every competitor)

1. Publish release conditions and beneficiary before funding; on-chain escrow events make actual releases independently checkable.
2. Present evidence provenance and timestamp separately from editorial/automated assessment.
3. Provide user-owned local watchlists without requiring API keys or account creation.
4. Explain exact alert rules and limits; no unexplained safety score or unsupported fraud label.
5. Provide receipts with transaction hash, chain ID, recipient, and confirmation distinction; never infer paid status from a wallet toast.

## Limits and assumptions

No empirical claim is made here that all existing products lack these features. Smart contract audits, internal endpoint telemetry, operational incident response, legal advice and human evidence review remain separate services. Public RPC rate limits, shallow reorgs, provider outages and incomplete historical state constrain monitoring. Use multiple independent RPCs for production, persistence and alerting; this browser prototype does not.

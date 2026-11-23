# AGENT.md — POLYBEESNETWORK WEB3 ENGINEERING STANDARD

## 1. PROJECT AUTHORITY

Repository: `Polybeesnetwork/cuddly-waddle`

Primary blockchain: BNB Smart Chain.

Project scope: Research, design, development, security validation, and delivery of an original high-value BSC Web3 product.

The agent must act as a senior autonomous engineering team, not merely a code generator.

This document governs all development work in the repository.

The project master brief determines the initial product mission. This file defines permanent engineering and execution standards.

## 2. CORE PRINCIPLES

**Build real utility.**

A working product is more valuable than speculative tokenomics, superficial dashboards, or an elaborate roadmap without implementation.

All development must follow:

- Evidence before claims
- Security before financial operations
- Working functionality before animations
- Maintainability before complexity
- Transparency before marketing
- Testing before production deployment
- User protection before monetization

Do not create fake financial metrics, fabricated users, fictitious activity, or invented partnerships.

## 3. AUTONOMOUS PRODUCT DISCOVERY

Research actual market gaps before committing to a product.

Compare competitors and validate technical feasibility.

Maintain:

- `docs/market-research.md`
- `docs/product-strategy.md`
- `docs/competitor-analysis.md`
- `docs/architecture.md`
- `docs/roadmap.md`

Clearly identify assumptions and unverified market claims.

Never present brainstorming as proven market demand.

## 4. PREMIUM WEBSITE QUALITY STANDARD

**Target: USD10,000+ custom-development quality benchmark.**

This describes expected craftsmanship, complexity, reliability, and visual sophistication. It is not a valuation guarantee.

The product must have:

- Original visual identity
- Premium fintech/Web3 styling
- Custom dashboard components
- Responsive layouts
- Consistent typography and spacing
- Meaningful interactive visualizations
- Carefully designed loading and error states
- Polished motion and micro-interactions
- Accessible components
- Excellent mobile experience
- Minimal cumulative layout shift
- Strong performance and maintainable code

Avoid generic templates, cluttered cards, excessive gradients, meaningless animated counters, and decorative features without product value.

Each page must have a specific user purpose.

Prefer a consistent design system over individually styled components.

## 5. BLOCKCHAIN CONFIGURATION

Primary network:

- BNB Smart Chain Mainnet
- Chain ID: 56
- Native currency: BNB

Development network:

- BNB Smart Chain Testnet
- Chain ID: 97
- Native currency: tBNB

Verify network parameters against official BNB Chain documentation.

**Authorized public recipient address:**

`0x938BA4c0E3962DcEB82c95D4906C4B9D906Ed829`

This address is the intended payment destination, subject to ownership confirmation before mainnet activation.

Never replace or redirect it to a developer wallet, intermediary wallet, or unrelated address.

Never assume access to its private key.

Never store user seed phrases, private keys, or raw signing secrets.

All payment routing must be disclosed clearly in the UI and source documentation.

## 6. PAYMENT ENGINEERING RULES

For payment-related features:

1. Validate chain ID.
2. Validate recipient.
3. Validate token contract and decimals.
4. Confirm amount and network before signing.
5. Distinguish broadcast from confirmation.
6. Verify transaction receipts against blockchain data.
7. Handle rejected wallet signatures.
8. Handle dropped, replaced, and failed transactions.
9. Prevent double-crediting.
10. Use transaction hashes as audit references.
11. Avoid trusting frontend-only payment status.
12. Support clear receipts and failure messages.

Where necessary, use an independently tested payment contract supporting unique order identifiers.

Never automatically execute mainnet transactions.

No production treasury movement or token deployment without explicit authorization.

## 7. SMART CONTRACT STANDARD

Use Solidity and maintained OpenZeppelin contracts where applicable.

Prefer simple, auditable contract designs.

Required checks:

- Access control
- Reentrancy
- Authorization
- Input validation
- Economic attack surfaces
- Token transfer failures
- Event integrity
- Withdrawal safety
- Unauthorized fund movement
- Emergency controls
- Ownership and privilege transparency

Use Foundry or Hardhat for automated tests.

Deploy to testnet before any mainnet consideration.

Do not claim a third-party audit without independent verification.

## 8. FRONTEND AND BACKEND STANDARD

Preferred stack:

- React / Next.js
- TypeScript
- Tailwind CSS
- Viem / Wagmi
- WalletConnect-compatible providers
- Solidity for necessary contracts
- PostgreSQL or Supabase where required
- Secure server-side APIs
- Vercel-compatible deployment

The agent may select alternatives if documented technical reasons justify them.

Use strict TypeScript where practical.

Avoid unnecessary dependencies.

Validate external inputs and handle API failures.

Use environment variables for secrets.

Do not expose private service credentials in public code.

## 9. DATA INTEGRITY

Every displayed metric must identify whether it is:

- LIVE — retrieved from a verified data source
- HISTORICAL — sourced from past verified records
- ESTIMATED — calculated under disclosed assumptions
- SIMULATED — generated for demonstration
- UNAVAILABLE — reliable data not currently accessible

Never silently substitute simulated data for live data.

For blockchain analytics, document data sources, indexer coverage, RPC limitations, update latency, and known gaps.

Predictive analytics must be presented as probabilistic research, not certainty.

## 10. FUNDRAISING AND TOKEN GUARDRAILS

A native token is optional and must be economically justified.

Do not create a token merely to manufacture demand or collect funds.

Do not promise APY, guaranteed returns, guaranteed listings, or price appreciation.

Public crowdfunding, investment solicitation, staking and token sales require relevant legal review and approval before activation.

If crowdfunding is proposed, clearly distinguish contributions, donations, subscriptions, purchases, and investment offerings.

Build testnet prototypes or documented feasibility studies until authorization is granted.

## 11. QUALITY ASSURANCE

Every substantial feature must be tested.

Minimum checks:

- Type checking
- Linting
- Unit tests
- Integration tests
- Contract tests where applicable
- Wallet interaction tests
- Payment receipt verification
- Responsive layout review
- Accessibility review
- Error-state testing
- Build verification
- Dependency vulnerability review

Do not report a test as passed unless it was actually executed.

Record skipped tests and unresolved defects.

## 12. GITHUB AND SOURCE MANAGEMENT

Maintain an organized, lightweight repository.

Suggested structure:

```text
/
├── agent.md
├── AGENTS.md
├── README.md
├── app/
├── components/
├── lib/
├── contracts/
├── scripts/
├── tests/
├── public/
├── docs/
├── reports/
├── package.json
├── .env.example
└── .gitignore
```

Adapt structure to the actual chosen framework.

Never commit:

- `.env` secrets
- Private keys
- Seed phrases
- Production signing credentials
- Node modules
- Build caches
- Unnecessary generated assets

Keep implementation source editable.

Prefer traceable commits and pull requests.

Preserve existing working features during refactoring.

## 13. CONTINUOUS PROJECT TRACKER

Maintain:

`docs/PROJECT_STATUS.md`

For each workstream record:

- ACHIEVED
- IN PROGRESS
- BLOCKED
- FAILED
- PENDING

Each completed milestone must include supporting evidence.

Maintain an honest record of remaining work.

## 14. AGENT EXECUTION BEHAVIOR

You are authorized to:

- Research the product opportunity
- Select an evidence-backed product concept
- Design interfaces
- Write and refactor code
- Implement testnet features
- Run tests
- Create documentation
- Prepare deployment configurations
- Commit changes on authorized development branches

You are not authorized to:

- Move real funds
- Launch a public investment offering
- Deploy production contracts managing user funds
- Issue or sell tokens publicly
- Make unverifiable financial promises
- Collect wallet secrets
- Publish sensitive credentials
- Claim independent security certification without evidence

Escalate only actions requiring ownership verification, financial authorization, legal clearance, or unavailable credentials.

Do not repeatedly ask for approval on ordinary implementation decisions.

## 15. DEFINITION OF DONE

A feature is complete only when:

1. Its purpose is documented.
2. Its implementation works.
3. Its inputs and failures are handled.
4. Its relevant tests pass.
5. Its UI is responsive.
6. Its security limitations are documented.
7. Its dependencies are recorded.
8. Its completion is reflected in the project tracker.

A project is not complete merely because the homepage renders.

## 16. FINAL PRODUCT PHILOSOPHY

Build something useful enough that people would choose to use it without owning a speculative token.

The objective is to create an original, commercially credible BNB Chain platform combining meaningful utility, premium design, secure engineering, honest analytics, and a sustainable revenue model.

**Think like a founder. Research like an analyst. Engineer like a security specialist. Design like a premium digital studio. Ship like a professional product team.**   ## PRODUCT INNOVATION & CREATIVE AUTONOMY

The project name, ticker, visual identity and final niche are not predetermined.

Agents must independently research branding conflicts, identify market gaps, and evaluate crowdfunding as a core product opportunity.

Prioritize differentiated utility, transparent payment infrastructure, contributor protection, intelligent due diligence and sustainable business models.

Agents may improve or replace the initial concept when supported by compelling market research and technical feasibility.

For major design or product decisions, document:

1. Alternatives evaluated.
2. Evidence supporting the chosen direction.
3. Competitive differentiation.
4. Security and regulatory implications.
5. Opportunities for future improvement.

The designated BSC treasury wallet must remain unchanged unless explicitly authorized. Campaign escrow and creator payouts must remain distinct from platform treasury funds.

All token launches, real-money fundraising and mainnet financial operations require separate authorization.

**Creative freedom is encouraged. Financial safety, transparency and engineering integrity are mandatory.**  # BINANCE SECURITY REVIEW — ADDITIONAL RESEARCH DIRECTIVE

Read and analyze the official Binance article published November 23, 2026:

https://www.binance.com/en/blog/security/6305213896361554553

Binance announced independent security reviews by Mandiant, SlowMist, and Verichains.

This announcement is not itself a completed audit report or proof of any specific exploit mechanism.

Research the following opportunity:

**Can we build an affordable, continuous security-intelligence and treasury-transparency layer for smaller BNB Chain projects and crowdfunding campaigns?**

Investigate:

1. What institutional security reviews typically examine.
2. Which controls are realistically achievable using public on-chain data.
3. Which risks require privileged off-chain infrastructure access.
4. How smaller projects can independently verify treasury activity.
5. How campaign contributors can inspect milestone releases and security evidence.
6. How automated monitoring and qualified human review can complement each other.
7. Whether existing competitors already solve these problems effectively.

Compare at least three product directions:

- Security monitoring as a service for small Web3 teams.
- Transparent crowdfunding with treasury monitoring and milestone controls.
- An independent security evidence and incident intelligence platform.

Select the strongest feasible opportunity and propose a functional BSC testnet prototype.

Do not claim to replicate Mandiant, SlowMist, or Verichains audits, and do not represent automated scanning as a substitute for expert security assessment.

Keep the original project naming, ticker research, premium $10K-class website, payment destination, and crowdfunding feasibility requirements intact.

Preserve the separation between research findings, confirmed incidents, and speculative attack hypotheses.

Deliver an evidence-backed opportunity assessment and working implementation wherever feasible.

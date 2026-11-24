# Incident replay and detection test plan

## Purpose

Test whether transparent, point-in-time rules surface a treasury event without using information unavailable at that time. The public prototype is not a replay of the Binance incident and does not claim it would have prevented it.

## Rules and timestamp discipline

- R1: watched wallet direct native transfer in a block newly observed by client → record block, tx hash, observation timestamp, direction, value.
- R2 (future): campaign escrow release event not matching versioned disclosed policy → alert using policy state committed before event block.
- R3 (future): delegation or admin change only if specific chain/event semantics are validated and parsed from block-time data.
- Never use subsequent labels, later address attribution, recovery data, or retrospective incident narrative to determine whether a prior alert fires.

## Synthetic fixtures

Use deterministic synthetic fixtures: outgoing/incoming BNB transfer, unrelated transfer, zero-value call, contract creation, duplicate poll, skipped block, provider error, chain-ID mismatch, and reorg replacing an observed block. Tests assert detection logic only; they contain no real incident transaction hashes/addresses.

## Benchmark methodology

For each fixture/replay, record event block timestamp, client observation time, observed latency, missed events and false positives. Report precision/recall only against explicitly labeled fixtures, not general real-world performance. Production latency benchmark needs an independent RPC harness and representative period. Browser polling's 12-second interval plus block finality/network lag means alerts are neither instant nor guaranteed. Current prototype does not store metrics or provide an empirical benchmark; no latency or false-positive performance claim is made.

## Current evidence

`npm test` runs unit tests for direct BNB transfer classification (outflow, inflow, irrelevant/no-value/contract-create, unrelated). These are synthetic unit tests, not chain integration tests. Reorg and RPC behavior are handled incompletely; scan window capped at four blocks. Historical Binance incident replay is not implemented because verified multi-chain raw records and a suitable point-in-time data corpus are not included.

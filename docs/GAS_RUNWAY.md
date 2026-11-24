# Gas Runway Planner

The `/gas-planner.html` route is a read-only launch-planning aid. On BNB Smart Chain, transaction gas is paid in native BNB; a project-issued token does not replace BNB for gas by default. Do not promise an alternative fee token without a chain-level protocol design and explicit validator/client support.

The tool verifies Chain ID 56 and may read `eth_gasPrice` and `eth_blockNumber`. The user supplies gas units (from compiler/deployer estimates), a planning buffer, and an optional local reserve amount. The calculation is gas units × gwei price with the buffer applied; it gives an illustrative cost and operation count. The starter 3,000,000 units is an editable placeholder, not a recommendation or a deployment quote.

No wallet is connected, no balance is fetched, no reserve value is sent to a server, and the page has no signing/transaction action. RPC failure leaves status unverified and does not fabricate a quote. Actual deployment cost depends on code, constructor arguments, network conditions, and execution. This is not a funding or investment recommendation.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html=await readFile(new URL('../contract.html',import.meta.url),'utf8');
const js=await readFile(new URL('../app/contract.js',import.meta.url),'utf8');

test('contract observatory reports limited read-only RPC facts, not a safety verdict',()=>{
  for(const fact of ['eth_getBalance','eth_getTransactionCount','eth_getCode','eth_blockNumber'])assert.ok(js.includes(fact),`missing read field ${fact}`);
  assert.ok(js.includes('rpc.assertNetwork()'),'must verify BNB Chain 56');
  assert.ok(html.includes('not a security verdict'));
  assert.ok(html.includes('No wallet connection, signatures, approvals, or transactions'));
  assert.ok(!js.includes('eth_sendTransaction'));
});
test('contract observatory UI escapes RPC/user text and links to the matching explorer address',()=>{
  assert.ok(js.includes('const esc='));
  assert.ok(js.includes('NETWORK.explorer}/address/'));
  assert.ok(html.includes('id="obsError"'));
  assert.ok(html.includes('id="report"'));
});

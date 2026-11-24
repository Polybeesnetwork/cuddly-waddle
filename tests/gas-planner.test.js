import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html=await readFile(new URL('../gas-planner.html',import.meta.url),'utf8');
const js=await readFile(new URL('../app/gas-planner.js',import.meta.url),'utf8');

test('gas runway is a read-only BNB Chain estimator, not a token or transaction tool',()=>{
  assert.ok(html.includes('A project token cannot replace BNB for network gas by default'));
  assert.ok(html.includes('does not create, sell, or issue any token'));
  assert.ok(html.includes('does not execute a transaction'));
  assert.ok(js.includes('rpc.assertNetwork()'));
  assert.ok(js.includes("rpc.request('eth_gasPrice')"));
  assert.ok(!js.includes('eth_sendTransaction'));
  assert.ok(!js.includes('personal_sign'));
});
test('gas planner uses entered units, live/manual gwei, and explicit configurable buffer',()=>{
  assert.ok(html.includes('id="gasUnits"'));
  assert.ok(html.includes('id="gasGwei"'));
  assert.ok(html.includes('id="gasBuffer"'));
  assert.ok(html.includes('id="reserveBnb"'));
  assert.ok(js.includes('parseGwei(String(gwei))'));
});

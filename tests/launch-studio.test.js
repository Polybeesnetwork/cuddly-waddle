import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html=await readFile(new URL('../launch-studio.html',import.meta.url),'utf8');
const js=await readFile(new URL('../app/launch-studio.js',import.meta.url),'utf8');
test('Launch Studio builds local specs but does not deploy, fund, or request wallet access',()=>{
  assert.ok(html.includes('no contracts deployed and no funds collected'));
  assert.ok(html.includes('No contribution address, payment processing, escrow'));
  assert.ok(html.includes('id="exportSpec"'));
  assert.ok(js.includes('new Blob([JSON.stringify(brief,null,2)]'));
  assert.ok(!js.includes('eth_sendTransaction'));
  assert.ok(!js.includes('window.ethereum'));
});
test('Launch Studio has a fixed-supply token concept and crowdfunding milestone/all-or-nothing drafts',()=>{
  for(const id of ['tokenName','tokenSymbol','tokenSupply','tokenDecimals','campaignGoal','campaignDays','campaignPurpose'])assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes('value="fixed"'));
  assert.ok(html.includes('value="milestone"'));
  assert.ok(html.includes('value="all-or-nothing"'));
});

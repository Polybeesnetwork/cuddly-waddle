import test from 'node:test';import assert from 'node:assert/strict';
const WATCH='0x938ba4c0e3962dceb82c95d4906c4b9d906ed829';
function observed(tx,watches){if(!tx.to||BigInt(tx.value||'0')===0n)return null;const to=watches.find(a=>a.toLowerCase()===tx.to.toLowerCase()),from=watches.find(a=>a.toLowerCase()===tx.from.toLowerCase());return to||from?{direction:to?'in':'out',address:to||from,hash:tx.hash}:null}
test('detects native BNB outflow from watched treasury',()=>assert.deepEqual(observed({from:WATCH,to:'0x123',value:'0x1',hash:'0xabc'},[WATCH]),{direction:'out',address:WATCH,hash:'0xabc'}));
test('detects incoming transfer to watched treasury',()=>assert.equal(observed({from:'0x123',to:WATCH,value:'0x100',hash:'0xdef'},[WATCH]).direction,'in'));
test('ignores zero-value and contract-creation transactions',()=>{assert.equal(observed({from:WATCH,to:'0x123',value:'0x0'},[WATCH]),null);assert.equal(observed({from:WATCH,to:null,value:'0x100'},[WATCH]),null)});
test('ignores unrelated transfers and compares addresses case-insensitively',()=>assert.equal(observed({from:'0xabc',to:'0xdef',value:'0x5'},[WATCH]),null));

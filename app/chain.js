import { formatEther, formatUnits, isAddress, parseAbiItem } from 'viem';

export const NETWORK = { chainId: 56, name: 'BNB Smart Chain', explorer: 'https://bscscan.com' };
export const RPC_URLS = ['https://bsc-dataseed.bnbchain.org', 'https://bsc-dataseed1.bnbchain.org'];
export const TRANSFER_EVENT = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');
const TOKEN_META_ABI = [
  { type:'function', name:'decimals', stateMutability:'view', inputs:[], outputs:[{type:'uint8'}] },
  { type:'function', name:'symbol', stateMutability:'view', inputs:[], outputs:[{type:'string'}] }
];
export class RpcPool {
  constructor({ urls=RPC_URLS, fetchImpl=fetch, timeoutMs=8000, minIntervalMs=350 }={}) { this.urls=urls; this.fetch=fetchImpl; this.timeoutMs=timeoutMs; this.minIntervalMs=minIntervalMs; this.nextAt=0; this.sequence=0; }
  async request(method, params=[]) {
    let lastError;
    for (const url of this.urls) {
      const wait=Math.max(0,this.nextAt-Date.now()); if(wait) await new Promise(r=>setTimeout(r,wait)); this.nextAt=Date.now()+this.minIntervalMs;
      const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),this.timeoutMs);
      try {
        const response=await this.fetch(url,{method:'POST',headers:{'content-type':'application/json'},signal:controller.signal,body:JSON.stringify({jsonrpc:'2.0',id:++this.sequence,method,params})});
        if(response.status===429) throw new Error('RPC rate limit (429)');
        if(!response.ok) throw new Error(`RPC HTTP ${response.status}`);
        const body=await response.json(); if(body.error) throw new Error(body.error.message||'RPC error');
        return body.result;
      } catch(error) { lastError=error.name==='AbortError'?new Error('RPC request timed out'):error; }
      finally { clearTimeout(timer); }
    }
    throw new Error(`All BNB RPC endpoints failed: ${lastError?.message||'unknown error'}`);
  }
  async assertNetwork(){const id=Number(await this.request('eth_chainId'));if(id!==NETWORK.chainId)throw new Error(`Wrong RPC network (chain ${id}); expected BNB Chain 56`);return id;}
}
export const hexNumber=n=>`0x${BigInt(n).toString(16)}`;
export const keyFor=(chain,hash,logIndex='native')=>`${chain}:${hash.toLowerCase()}:${logIndex}`;
export function classifyNative(tx, watched) {
  if(!tx.to||BigInt(tx.value||'0')===0n)return null;
  const from=watched.find(a=>a.toLowerCase()===tx.from.toLowerCase());
  const to=watched.find(a=>a.toLowerCase()===tx.to.toLowerCase());
  if(!from&&!to)return null;
  return {key:keyFor(56,tx.hash),chainId:56,hash:tx.hash,blockNumber:Number(BigInt(tx.blockNumber)),blockHash:tx.blockHash,from:tx.from,to:tx.to,watched:to||from,direction:from&&to?'internal':from?'out':'in',asset:'BNB',amount:formatEther(BigInt(tx.value)),source:'native transaction'};
}
export function classifyTokenLog(log, watched, token) {
  const from=`0x${log.topics[1].slice(-40)}`,to=`0x${log.topics[2].slice(-40)}`;
  const f=watched.find(a=>a.toLowerCase()===from.toLowerCase()),t=watched.find(a=>a.toLowerCase()===to.toLowerCase()); if(!f&&!t)return null;
  return {key:keyFor(56,log.transactionHash,Number(BigInt(log.logIndex))),chainId:56,hash:log.transactionHash,blockNumber:Number(BigInt(log.blockNumber)),blockHash:log.blockHash,from,to,watched:t||f,direction:f&&t?'internal':f?'out':'in',asset:token.symbol,amount:formatUnits(BigInt(log.data),token.decimals),token:token.address,source:'BEP-20 Transfer log'};
}
export async function validateToken(rpc,address){
  if(!isAddress(address))throw new Error('Invalid token contract address');
  const [decHex,symbol]=await Promise.all([rpc.request('eth_call',[{to:address,data:'0x313ce567'},'latest']),rpc.request('eth_call',[{to:address,data:'0x95d89b41'},'latest'])]);
  const decimals=Number(BigInt(decHex)); if(!Number.isInteger(decimals)||decimals<0||decimals>36)throw new Error('Token returned an unsupported decimals value');
  let ticker='TOKEN';try{const bytes=symbol.slice(2).replace(/00+$/,'');ticker=new TextDecoder().decode(Uint8Array.from(bytes.match(/.{1,2}/g)||[],x=>parseInt(x,16))).replace(/[^\x20-\x7e]/g,'').slice(0,12)||ticker}catch{}
  return {address,decimals,symbol:ticker};
}
export async function scanBlock(rpc,number,watched,tokens=[]) {
  const b=await rpc.request('eth_getBlockByNumber',[hexNumber(number),true]);if(!b)throw new Error(`Block ${number} unavailable`);
  const events=[];for(const tx of b.transactions){const event=classifyNative(tx,watched);if(event)events.push(event)}
  for(const token of tokens){
    for(const address of watched){const logs=await rpc.request('eth_getLogs',[{address:token.address,fromBlock:b.number,toBlock:b.number,topics:[TRANSFER_EVENT.topicHash,`0x${address.slice(2).toLowerCase().padStart(64,'0')}`]}]);for(const log of logs){const ev=classifyTokenLog(log,watched,token);if(ev)events.push(ev)}
      const paddedAddress = `0x${address.slice(2).toLowerCase().padStart(64, '0')}`;
      const incoming=await rpc.request('eth_getLogs',[{address:token.address,fromBlock:b.number,toBlock:b.number,topics:[TRANSFER_EVENT.topicHash,null,paddedAddress]}]);for(const log of incoming){const ev=classifyTokenLog(log,watched,token);if(ev)events.push(ev)}
    }
  }
  const unique=[...new Map(events.map(event=>[event.key,event])).values()];
  return {block:{number:Number(BigInt(b.number)),hash:b.hash,parentHash:b.parentHash,timestamp:Number(BigInt(b.timestamp))},events:unique};
}
export async function verifiedReceipt(rpc,hash){
  const receipt=await rpc.request('eth_getTransactionReceipt',[hash]);if(!receipt)return {state:'pending'};
  const block=await rpc.request('eth_getBlockByNumber',[receipt.blockNumber,false]);
  if(block?.hash?.toLowerCase()!==receipt.blockHash.toLowerCase())return {state:'reorged'};
  return {state:BigInt(receipt.status)===1n?'confirmed':'failed',blockNumber:Number(BigInt(receipt.blockNumber)),blockHash:receipt.blockHash,transactionHash:receipt.transactionHash};
}

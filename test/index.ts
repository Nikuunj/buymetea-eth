import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);

async function pollBlock(blockNumber: number) {
   const block = await provider.getBlockWithTransactions(blockNumber);

   if (!block) {
      console.log("Block not found");
      return;
   }
   
   console.log("Filtered Transactions:");
   console.log(JSON.stringify(block, null, 2));
}

async function main() {
   // await pollBlock(23433513);
   const ss = '0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099';
   console.log(ss.length);
   
}

main();

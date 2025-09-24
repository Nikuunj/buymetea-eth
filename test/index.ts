import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);

async function pollBlock(blockNumber: number) {
   const block = await provider.getBlockWithTransactions(blockNumber);

   if (!block) {
      console.log("Block not found");
      return;
   }

   // // Filter by `from` address
   // const targetAddress = "0x11b0E7Bef4046dD43b09489926F30514584B1161".toLowerCase();
   // const filteredTxs = block.transactions.filter(
   //    (tx) => tx.from.toLowerCase() === targetAddress
   // );

   console.log("Filtered Transactions:");
   console.log(JSON.stringify(block, null, 2));
}

async function main() {
   await pollBlock(23433513);
}

main();

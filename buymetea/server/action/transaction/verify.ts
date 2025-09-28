import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);

const ERC20_ABI = [
   "event Transfer(address indexed from, address indexed to, uint256 value)",
   "function decimals() view returns (uint8)",
   "function symbol() view returns (string)"
];

interface TxType {
   token: string;
   from: string;
   to: string;
   amount: string;
}

// your target contract
const CONTRACT_ADDRESS = "0x54C43f12B26601CA01518c6611E0d6798e53972f".toLowerCase();

export async function getAdd_TEA_TxDetails(txHash: string): Promise<TxType | null> {
   const tx = await provider.getTransaction(txHash);
   const receipt = await provider.getTransactionReceipt(txHash);

   if (!tx) {
      console.log("Transaction not found");
      return null;
   }

   // Case 1: ETH transfer (value > 0)
   if (tx.value.gt(0)) {
      // make sure ETH is sent to contract
      if (!tx.to || tx.to.toLowerCase() !== CONTRACT_ADDRESS) {
         console.log("ETH transfer not sent to contract.");
         return null;
      }

      const amountEth = ethers.utils.formatEther(tx.value);

      const filter: TxType = {
         token: "ETH",
         from: tx.from,
         to: tx.to,
         amount: amountEth
      };
      return filter;
   }

   // Case 2: ERC20 token transfer (look in logs)
   const iface = new ethers.utils.Interface(ERC20_ABI);
   for (const log of receipt.logs) {
      try {
         const parsed = iface.parseLog(log);
         if (parsed.name === "Transfer") {
         // condition 1: ERC20 sender must match tx sender
         if (parsed.args.from.toLowerCase() !== tx.from.toLowerCase()) {
            console.log("ERC20 log sender does not match tx sender.");
            continue;
         }

         // condition 2: ERC20 recipient must be the contract
         if (parsed.args.to.toLowerCase() !== CONTRACT_ADDRESS) {
            console.log("ERC20 transfer not sent to target contract.");
            continue;
         }

         const token = new ethers.Contract(log.address, ERC20_ABI, provider);
         const decimals = await token.decimals();
         const symbol = await token.symbol();
         const amount = ethers.utils.formatUnits(parsed.args.value, decimals);

         const filter: TxType = {
            token: symbol,
            from: parsed.args.from,
            to: parsed.args.to,
            amount: amount
         };
         return filter;
         }
      } catch {
         // not a Transfer log
      }
   }

   console.log("No valid ETH or ERC20 transfer found in this tx.");
   return null;
}
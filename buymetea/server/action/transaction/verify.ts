import { buymeatea_address } from "@/config/config";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/mxERBjRDJBMyKOE2DqXgILP1vx7iulPl");

const CONTRACT_ABI = [
  "function addTeaReward(address _address) payable"
];

interface TxType {
   token: string;
   from: string;
   to: string;
   amount: string;
}

// your target contract
const CONTRACT_ADDRESS = buymeatea_address;

export async function getAdd_TEA_TxDetails(txHash: string): Promise<TxType | null> {
   const tx = await provider.getTransaction(txHash);
   const receipt = await provider.getTransactionReceipt(txHash);

   if (!tx) {
      console.log("Transaction not found");
      return null;
   }

   // Case 1: ETH transfer (value > 0)
   if (tx.value.gt(0)) {      
      
      if (!tx.to || tx.to !== CONTRACT_ADDRESS) {
         console.log("ETH transfer not sent to contract.");
         return null;
      }

      const amountEth = ethers.utils.formatEther(tx.value);

      const iface = new ethers.utils.Interface(CONTRACT_ABI);
      try {
         const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
         
         const filter: TxType = {
            token: "ETH",
            from: tx.from,
            to: decoded.args._address,
            amount: amountEth
         };
         return filter;
      } catch(e) {
         console.log("Not an addTeaReward tx:", e);
         return null;
      }

   }
   console.log("No valid ETH or ERC20 transfer found in this tx.");
   return null;
}
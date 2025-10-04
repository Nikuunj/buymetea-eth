import { buymeatea_address } from "@/config/config";
import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function addTeaReward(address _address) payable"
];

interface TxType {
   token: string;
   from: string;
   to: string;
   amount: bigint;
}

const CONTRACT_ADDRESS = buymeatea_address;
const RPC_URL = process.env.RPC_URL || ""; 

async function fetchTransaction(txHash: string) {
   const response = await fetch(RPC_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         jsonrpc: '2.0',
         method: 'eth_getTransactionByHash',
         params: [txHash],
         id: 1,
      }),
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const data = await response.json();
   
   if (data.error) {
      throw new Error(data.error.message);
   }

   return data.result;
}

export async function getAdd_TEA_TxDetails(txHash: string): Promise<TxType | null> {
   
   try {
      const txData = await fetchTransaction(txHash);
      
      if (!txData) {
         console.log("Transaction not found");
         return null;
      }
   
      const value = ethers.BigNumber.from(txData.value);
      
      if (value.gt(0)) {      
         if (!txData.to || txData.to.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
            console.log("ETH transfer not sent to contract.");
            return null;
         }
         const amount = value.toBigInt();
         const iface = new ethers.utils.Interface(CONTRACT_ABI);
         
         try {
            const decoded = iface.parseTransaction({ 
               data: txData.input, 
               value: value 
            });
            
            const filter: TxType = {
               token: "ETH",
               from: txData.from,
               to: decoded.args._address,
               amount
            };
            return filter;
         } catch(e) {
            console.log("Not an addTeaReward tx:", e);
            return null;
         }
      }
      
      console.log("No valid ETH or ERC20 transfer found in this tx.");
      return null;
      
   } catch(e: any) {
      console.error('Error fetching transaction:', {
         message: e.message,
         stack: e.stack
      });
      return null;
   }
}
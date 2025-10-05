import { buymeatea_address } from "@/config/config";
import { ethers } from "ethers";

const CONTRACT_ABI = [
  "function addTeaReward(address _address) payable",
   "function claimTeaReward(uint256 _amount)"
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
   const response = await fetch('https://eth-sepolia.g.alchemy.com/v2/mxERBjRDJBMyKOE2DqXgILP1vx7iulPl', {
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
export async function getTEA_TxDetails(txHash: string): Promise<TxType | null> {
   try {
      const txData = await fetchTransaction(txHash);
      if (!txData) {
         console.log("Transaction not found");
         return null;
      }

      const iface = new ethers.utils.Interface(CONTRACT_ABI);

      let decoded;
      try {
         decoded = iface.parseTransaction({ data: txData.input, value: txData.value });
      } catch (e) {
         console.log("Transaction not from BuyMeTea contract ABI");
         return null;
      }

      const value = ethers.BigNumber.from(txData.value).toBigInt();
      let toAddress: string;
      let fromAddrss: string;
      let amount: bigint;

      if (decoded.name === "addTeaReward") {
         // must be sent TO the contract
         if (!txData.to || txData.to.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
         console.log("addTeaReward tx not sent to contract");
         return null;
         }
         toAddress = decoded.args._address;
         fromAddrss = txData.from;
         amount = value;
      } else if (decoded.name === "claimTeaReward") {
         // this will be a call FROM the user TO the contract, but payout happens contract -> user
         toAddress = txData.from; 
         fromAddrss = CONTRACT_ADDRESS
         amount = BigInt(decoded.args._amount.toString());
      } else {
         console.log("Unrecognized transaction type");
         return null;
      }

      const result: TxType = {
         token: "ETH",
         from: fromAddrss,
         to: toAddress,
         amount
      };

      return result;
   } catch (e: any) {
      console.error("Error fetching transaction:", {
         message: e.message,
         stack: e.stack,
      });
      return null;
   }
}

async function main() {
   const a = await getTEA_TxDetails('0xf089f92cd6bfc6c7b36c4c0f3ab4f7b42350894b256f197e7f93fb849b9772a4')
   console.log(a);
   
}

main()

// deposit
// 0xb8d3d1374d523f9790f1f945bef98c44696aa11fc422e4c1bbad122034dddc90

// 0xf089f92cd6bfc6c7b36c4c0f3ab4f7b42350894b256f197e7f93fb849b9772a4
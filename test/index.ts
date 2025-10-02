import { ethers } from "ethers";
import buy_abi from './BuyteaContract.json';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const ERC20_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

async function getTxDetails(txHash: string) {
  const tx = await provider.getTransaction(txHash);
  const receipt = await provider.getTransactionReceipt(txHash);

  if (!tx) {
    console.log("Transaction not found");
    return;
  }

  // Case 1: ETH transfer (value > 0)
  if (tx.value.gt(0)) {
    const amountEth = ethers.utils.formatEther(tx.value);
    console.log("Token: ETH");
    console.log("From:", tx.from);
    console.log("To:", tx.to);
    console.log("Amount:", amountEth, "ETH");
    return;
  }

  // Case 2: ERC20 token transfer (look in logs)
  const iface = new ethers.utils.Interface(ERC20_ABI);
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed.name === "Transfer") {
         const token = new ethers.Contract(log.address, ERC20_ABI, provider);
         const decimals = await token.decimals();
         const symbol = await token.symbol();
         const amount = ethers.utils.formatUnits(parsed.args.value, decimals);

         console.log("Token:", symbol);
         console.log("Contract:", log.address);
         console.log("From:", parsed.args.from);
         console.log("To:", parsed.args.to);
         console.log("Amount:", amount, symbol);
         return;
      }
    } catch (e) {
      // not a Transfer log
    }
  }

  console.log("No ETH or ERC20 transfer found in this tx.");
}

async function main() {
// 0x227665321a81adfe5368a442838dbc87b4464aa2c63d745e0af4e5045dc1e2e7
  const txHash = "0x227665321a81adfe5368a442838dbc87b4464aa2c63d745e0af4e5045dc1e2e7";
  await getTxDetails1(txHash);
}

const CONTRACT_ABI = [
  "function addTeaReward(address _address) payable"
];

const CONTRACT_ADDRESS = "0x54C43f12B26601CA01518c6611E0d6798e53972f"

async function getTxDetails1(txHash: string) {
  const tx = await provider.getTransaction(txHash);

  if (!tx) {
    console.log("Transaction not found");
    return;
  }

  const iface = new ethers.utils.Interface(CONTRACT_ABI);

  try {
    const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
    console.log('From', tx.from)
    console.log("Function called:", decoded.name);
    console.log("_address param:", decoded.args._address);
    console.log("Value (ETH):", ethers.utils.formatEther(tx.value));
  } catch (err) {
    console.log("Not an addTeaReward tx:", err);
  }
}

main();


// 0x227665321a81adfe5368a442838dbc87b4464aa2c63d745e0af4e5045dc1e2e7

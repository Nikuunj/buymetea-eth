import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);

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
   // 0x69d797dbdf03d9c7b0a7dc5b801d30df57001b2972e2412226dd6b2da85992dc
   // 0x140b3cba8bdc5fe30d214d2d329a1b51ef4ef58fd7af5043ea7ff1fb3e3c6f4b
  const txHash = "0x69d797dbdf03d9c7b0a7dc5b801d30df57001b2972e2412226dd6b2da85992dc";
  await getTxDetails(txHash);
}

main();

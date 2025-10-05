"use client"
import { useRef } from "react";
import Box from "../ui/Box";
import Button from "../ui/Button";
import InputBox from "../ui/InputBox";
import { PowerIcon } from "lucide-react";
import ConnectBtn from "../ui/ConnectBtn";
import { useAccount, useWriteContract } from "wagmi";
import EthLogo from "../logo/EthLogo";
import { buymeatea_abi, buymeatea_address } from "@/config/config";
import { parseEther } from "viem";
import { trpc } from "@/utils/trpc";

interface DepositFormProps {
   balance: string;
   closeFn: () => void;
}

function DepositForm({ balance, closeFn }: DepositFormProps) {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(1).fill(null));
   const { address } = useAccount();
   const { writeContractAsync } = useWriteContract()
   const createTxMutation = trpc.tx.create_tx_deposit.useMutation({
      onSuccess: (data) => {
         console.log('data', data);
         
      },
      onError: (err) => {
         console.error("failed:", err);
      },
   });

   async function handleSubmit() {
      const amount = ref.current[0]?.value;

      if (!amount || Number(amount) <= 0) {
         alert('Please enter a valid amount.');
         return;
      }
      if(Number(amount) > Number(balance)) {
         alert('Insufficient balance.');
         return
      }

      if(!address) {
         alert('Please connect wallet');
         return;
      }

      try {
         const eth = parseEther(amount);
         const txHash = await writeContractAsync({
            address: buymeatea_address,
            abi: buymeatea_abi,
            functionName: 'claimTeaReward',
            args: [eth],
         })

         await createTxMutation.mutateAsync({
            amount: eth,
            to_address: address,
            txHash
         })

         closeFn();
      } catch(e) {
         console.error("Error is ", e)
      } finally {

      }
      
   }

   return (
      <div className="fixed inset-0 z-50 bg-green-800/20 min-h-screen flex justify-center items-center" onClick={closeFn}>
         <div className="flex" onClick={(e) => e.stopPropagation()}>
            <Box>
               <div className="md:py-15 pt-15 md:px-15 col-span-2 flex flex-col gap-13">
                  <div className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                     Withdraw Reawrds  <div className="w-3.5"><EthLogo /></div>
                  </div>
                  <div className="flex flex-col gap-6 justify-center h-full relative -top-0 md:-top-2">
                     <InputBox refrence={(e) => ref.current[0] = e}
                        typeOfIn={'text'}
                        placeHolder={'Amount...'}
                     /> 

                     <p className="border max-w-56 min-w-56 text-base text-emerald-800 rounded-md  flex justify-between">
                        <p className="px-3 py-2 truncate">
                           {address ? address : 'Connect Wallet'} 
                        </p>
                        <ConnectBtn size="none" className="p-1 px-3 h-full rounded-none rounded-r-md"><PowerIcon /></ConnectBtn>
                     </p>

                     <Button varient='default' size="md" className="rounded-md w-full" handleClick={handleSubmit}>Withdraw</Button>
                  </div>
               </div>
            </Box>
         </div>
      </div>
   )
}

export default DepositForm
'use client'

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import Button from "../ui/Button";
import ConnectBtn from "../ui/ConnectBtn";
import { buymeatea_abi, buymeatea_address } from "@/config/config";
import { parseEther } from "viem";
import { trpc } from "@/utils/trpc";


function BuyForm({ u_address, u_name, u_id }: { u_address: string, u_name: string, u_id: number }) {
   const [count, setCount] = useState(1);
   const { writeContractAsync } = useWriteContract()
   const [name, setName] = useState("");
   const [message, setMessage] = useState("");
   const pricePerTea = 60; // ₹60 per tea
   const total = isNaN(count) ? 0 : count * pricePerTea;
   const [loading, setLoading] = useState<boolean>(false);
   const { address } = useAccount();

   const createTxMutation = trpc.tx.create_tx_msg.useMutation({
      onSuccess: (data) => {
         console.log('data', data);
         
      },
      onError: (err) => {
         console.error("failed:", err);
      },
   });


   const handleSubmit = async () => {
      const formData = {
         name,
         message,
         count,
         total,
      };
      const eth = parseEther('0.00001');
      setLoading(true);
      try{
         const txHash = await writeContractAsync({
            address: buymeatea_address,
            abi: buymeatea_abi,
            functionName: 'addTeaReward',
            args: [u_address],
            value: eth,
         })
         
         await createTxMutation.mutateAsync({
            toUserId: Number(u_id),
            to_address: u_address,
            amount: eth,
            txHash: txHash,
            name,
            say: message
         })
         
         setName("");
         setMessage("");
         setCount(1);
      } catch(e) {
         console.error("Error is ", e);
      } finally {
         setLoading(false);
      }
   };
   
   return (
      <div
         className="max-w-md mx-auto space-y-6 "
      >
         {loading && 'Loading...'}
         <h2 className="text-2xl font-semibold">
            Buy {u_name} a Tea 🍵
         </h2>

         <div className="flex items-center justify-center space-x-4 bg-purple-50 border border-purple-300 rounded-xl px-3 py-4">
            <span className="text-2xl sm:text-4xl">🍵</span>
            <div className="flex space-x-3">
               {[1, 3, 5].map((num) => (
               <button
                  type="button"
                  key={num}
                  onClick={() => setCount(num)}
                  className={`px-3 md:px-5 py-0.5 md:py-3 transition-all duration-300 outline-0 rounded-full border text-lg  ${
                     count === num
                     ? "bg-purple-400 text-white font-semibold border-purple-400"
                     : "text-purple-600 border-gray-300 hover:bg-purple-100"
                  }`}
               >
                  {num}
               </button>
               ))}
               <input
                  type="number"
                  placeholder="10"
                  value={isNaN(count) ? "" : count}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value === "") {
                        setCount(NaN);
                     } else {
                        setCount(Number(value));
                     }
                  }}
                  className="w-7 md:w-12 px-2 py-1.5 rounded-lg border border-gray-300 text-center outline-0"
                  />
            </div>
         </div>

         <input
            type="text"
            placeholder="Name or @yoursocial"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full transition-all duration-300 outline-0 px-4 py-3 bg-gray-200 focus:bg-white
            rounded-lg  focus:ring-2 focus:ring-purple-400"
         />
         <textarea
            placeholder="Say something nice..."
            value={message}
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 transition-all duration-300
            bg-gray-200 focus:bg-white rounded-lg outline-0 focus:ring-2 focus:ring-purple-400 
            overflow-hidden resize-none"
            />

         {
            address ? 
            <Button varient='tip' 
               size="md" className="rounded-full w-full" 
               handleClick={handleSubmit} >
                  Total {total}
            </Button> : <ConnectBtn>Connect</ConnectBtn>
         }
      </div>
   );
}

export default BuyForm;

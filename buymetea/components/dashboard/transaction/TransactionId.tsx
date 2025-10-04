"use client"

import TextWithHeader from "@/components/ui/TextWithHeader";
import { trpc } from "@/utils/trpc";
import { ethers } from "ethers";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function TransactionId({ id }: { id: string }) {
   const router = useRouter();
   const { data, isLoading, isError, error } = trpc.tx.get_tx_id.useQuery({ id },
      {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
      }
   );
   
   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      return <div>Error: {error.message}</div>
   }

   if (!data?.tx) {
      return <div>No profile data found.</div>
   }

   return (
      <div className="w-full">
         <div className="w-fit fixed top-10  mt-10 flex gap-3 items-center cursor-pointer" 
         onClick={() => router.push('/dashboard/transaction')}>
            <ChevronLeft /> back
         </div>
         <div className="w-full">
            <TextWithHeader header={"from"} text={data.tx.from}/>
            <TextWithHeader header={"Date"} text={data.tx.dateTime.toUTCString()} />
            <TextWithHeader header={"amount"} text={ `${ethers.utils.formatEther(data.tx.amount)} ${data.tx.tokenName}`}/>
            <TextWithHeader header={"transaction hash"} text={`${data.tx.txHash}`}/>
         </div>
      </div>
   )
}

export default TransactionId
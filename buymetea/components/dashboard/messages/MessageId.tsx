"use client"

import TextWithHeader from "@/components/ui/TextWithHeader";
import { trpc } from "@/utils/trpc";
import { ethers } from "ethers";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function MessageId({ id }: { id: string }) {
   const router = useRouter();
   const { data, isLoading, isError, error } = trpc.message.getMsgById.useQuery({ id },
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

   if (!data?.msg) {
      return <div>No Message data found.</div>
   }

   
   return (
      <div className="w-full">
         <div className="w-fit fixed top-10  mt-10 flex gap-3 items-center cursor-pointer" 
         onClick={() => router.push('/dashboard/message')}>
            <ChevronLeft /> back
         </div>
         <div className="w-full">
            <TextWithHeader header={"name"} text={data.msg.name}/>
            <TextWithHeader header={"say"} text={data.msg.say}/>
            <TextWithHeader header={"Date"} text={data.msg.dateTime.toUTCString()} />
            <TextWithHeader header={"amount"} text={`${ethers.utils.formatEther(data.msg.amount)} ${data.msg.tokenName}`}/>
            <TextWithHeader header={"from"} text={data.msg.from}/>
         </div>
      </div>
   )
}

export default MessageId
"use client"

import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import TextWithHeader from "../ui/TextWithHeader";
import { useEffect, useState } from "react";
import { readContract } from '@wagmi/core'
import { buymeatea_abi, buymeatea_address, config, NEXT_PUBLIC_API_URL } from "@/config/config";
import { formatEther } from "viem";
import { Share2 } from "lucide-react";
import path from "path";

function RightSide() {
   const router = useRouter();
   const [balance, setBalance] = useState('0');

   const { data, isLoading, isError, error } = trpc.profile.get_full_user_profile.useQuery(undefined,
      {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
      }
   );

   useEffect(() => {
      if(data) {
         (async () => {
            const result   = await readContract(config, {
                  abi: buymeatea_abi,
                  address: buymeatea_address,
                  functionName: 'balanceOf',
                  args: [data.address]
               }
            ) as unknown as bigint;
            setBalance(formatEther(result))
         })()
      }
   }, [data])

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      if(error.data?.code === 'UNAUTHORIZED') {
         router.push('/auth/login')
         return;
      }
      
      if(error.data?.code === 'BAD_REQUEST') {
         router.push('/auth/login')
         return;
      }

      if(error.data?.code === 'NOT_FOUND') {
         router.push('/profile/create')
         return;
      }
      
      return <div>Error: {error.message}</div>
   }

   if (!data) {
      return <div>No profile data found.</div>
   }
   
   return (
      <div className="w-full">
         <div className="fixed right-5 mt-3 flex items-center cursor-pointer" onClick={async () => {
            const share = path.join(`${NEXT_PUBLIC_API_URL}/u/${data.userName}`);
            await navigator.clipboard.writeText(share);
            alert("Copy to clipboard")
         }}>
            <Share2 className="w-5.5 h-5.5"/>
         </div>
         <TextWithHeader header="display name" text={data.name}/>
         <TextWithHeader header="username" text={data.userName}/>
         <TextWithHeader header="balance" text={balance}/>
         <TextWithHeader header="Wallet Address" text={data.address}/>
         <TextWithHeader header="email" text={data.email}/>
         <TextWithHeader header="about" text={data.about}/>
      </div>
   )
}

export default RightSide
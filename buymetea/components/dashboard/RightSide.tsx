"use client"

import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import TextWithHeader from "../ui/TextWithHeader";

function RightSide() {
   const router = useRouter();
   const { data, isLoading, isError, error } = trpc.profile.get_full_user_profile.useQuery(undefined,
      {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
      }
   );

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
         <TextWithHeader header="display name" text={data.name}/>
         <TextWithHeader header="username" text={data.userName}/>
         <TextWithHeader header="Wallet Address" text={data.address}/>
         <TextWithHeader header="email" text={data.email}/>
         <TextWithHeader header="about" text={data.about}/>
      </div>
   )
}

export default RightSide
"use client"

import { trpc } from "@/utils/trpc"
import { useRouter } from "next/navigation";

function Profile({ userid, username }: { userid?: number, username?: string }) {
   const router = useRouter();
   const { data, isLoading, isError, error } = trpc.profile.get_user_profile.useQuery({ user_id: userid, user_name: username },
      {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
      }
   );
   
   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
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
      <div>
         <h1>{JSON.stringify(data)} hi hi </h1>
      </div>
   )
}

export default Profile
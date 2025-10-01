"use client"

import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router";

function Profile({ userid }: { userid: number }) {
   const { data, isLoading, isError, error } = trpc.profile.get_user_profile.useQuery({ user_id: userid },
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
"use client"

import { trpc } from "@/utils/trpc"

function Profile({ userid, username }: { userid?: number, username?: string }) {
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
      return <div>Error: {error.message}</div>
   }

   if (!data?.profile) {
      return <div>No profile data found.</div>
   }


   return (
      <div>
         <h1>{JSON.stringify(data.profile)}</h1>
      </div>
   )
}

export default Profile
"use client"
import AboutUser from '@/components/User/AboutUser'
import Box from '@/components/User/Box'
import BuyForm from '@/components/User/BuyForm'
import Navbar from '../NavFooter/Navbar'
import { trpc } from '@/utils/trpc'

function UsernameClient({ username }: { username: string }) {
   const { data, isLoading, isError, error } = trpc.profile.get_user_profile.useQuery({ user_name: username },
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

   if(!data?.profile) {
      return <div>Error: profile not found</div>
   }
   return (
      <>
         <Navbar isBuy={true} name={data.profile.name}/>
         <div className='flex min-h-screen relative top-44 justify-center items-center text-base bg-green-50'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap px-2'>
               <Box>
                  <AboutUser
                  name={data.profile.name}
                  aboutText={data.profile.about}
                  />
               </Box>
               <Box>
                  <BuyForm u_address={data.profile.address} u_id={data.profile.userId} u_name={data.profile.name}/>
               </Box>
            </div>
         </div>
      </>
   )
}

export default UsernameClient
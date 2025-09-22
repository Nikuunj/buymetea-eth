import Navbar from '@/components/NavFooter/Navbar'
import AboutUser from '@/components/User/AboutUser'
import Box from '@/components/User/Box'
import BuyForm from '@/components/User/BuyForm'
import UsernameClient from '@/components/User/UsernameClient'
import React from 'react'

async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
   const resolvedParams = await params;
   const username = resolvedParams.username;

   return (
      <div className='bg-green-50'>
         <Navbar isBuy={true} name='Nikunj'/>
         <UsernameClient username={username}/>
      </div>
   )
}

export default UsernamePage
import Navbar from '@/components/NavFooter/Navbar'
import UsernameClient from '@/components/User/UsernameClient'

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
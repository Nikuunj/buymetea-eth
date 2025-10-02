import UsernameClient from '@/components/User/UsernameClient'

async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
   const resolvedParams = await params;
   const username = resolvedParams.username;

   return (
      <div className='bg-green-50'>
         <UsernameClient username={username}/>
      </div>
   )
}

export default UsernamePage
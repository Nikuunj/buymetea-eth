import AboutUser from '@/components/User/AboutUser'
import Box from '@/components/User/Box'
import BuyForm from '@/components/User/BuyForm'

function UsernameClient({ username }: { username: string }) {

   const aboutTx = `👋 Hi, I’m Nikunj!

I’m a Software Developer who loves solving real problems with code. Most of the time, I’m building web applications, learning new things, and creating simple tools that make a real impact.

If you’d like to support my work (or just fuel my coding sessions ☕), your help means a lot! 💙

`
   return (
      <div className='flex min-h-screen relative top-44 justify-center items-center text-base bg-green-50'>
         <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap px-2'>
            <Box>
               <AboutUser
               name={'Nikunj Makwana'}
               aboutText={aboutTx}
                />
            </Box>
            <Box>
               <BuyForm />
            </Box>
         </div>
      </div>
   )
}

export default UsernameClient
"use client"
import Button from "@/components/ui/Button"
import InputBox from "@/components/ui/InputBox"
import Box from "@/components/User/Box"
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

function Loginpage() {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(2).fill(null));
   const router = useRouter();
   const loginMutation = trpc.auth.login_user.useMutation({
      onSuccess: (data) => {
         console.log("Login success:", data.token, data.message);
         localStorage.setItem("token", data.token)
         router.push(`/profile/${data.user_id}`);
         return;
      },
      onError: (err) => {
         console.error("Login failed:", err.message);
         if(err.data?.code === 'NOT_FOUND') {
            router.push('/auth/signup');
            return;
         }
      },
   });

   async function handleSubmit(e: FormEvent) {
      e.preventDefault()
      const arr = ref.current.map(val => val?.value);
      const email = arr[0];
      const password = arr[1];
   
      loginMutation.mutateAsync({
         email_address: email!,
         password: password!
      })
   }
   return (
      <div className="flex gap-3">
         {/* <Box>
            <div className=" min-w-md"></div>
         </Box> */}
         <Box>
            <div className="md:py-15 pt-15 md:px-15 col-span-2 flex flex-col gap-13">
            <div className="text-xl font-semibold text-emerald-800">
               Welcome Back  👋
            </div>
            <form onSubmit={handleSubmit}>
               <div className="flex flex-col gap-6 justify-center h-full relative -top-0 md:-top-2">
                  {/* <p className="text-emerald-500">Email or username</p> */}
                  <InputBox refrence={(e) => ref.current[0] = e}
                     typeOfIn={'text'}
                     placeHolder={'Email'}
                  />
                  {/* <p className="text-emerald-500">Password</p> */}
                  <InputBox refrence={(e) => ref.current[1] = e}
                     typeOfIn={'password'}
                     placeHolder={'Password'}
                  />
                  <Button varient='default' size="md" className="rounded-md w-full" handleClick={() => ''}>Login</Button>
               </div>
            </form>
         </div>
         </Box>
      </div>
   )
}

export default Loginpage
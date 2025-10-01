"use client"
import Button from "@/components/ui/Button"
import InputBox from "@/components/ui/InputBox"
import Box from "@/components/User/Box"
import { trpc } from "@/utils/trpc";
import { FormEvent, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";


function CreateProfilePage() {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(3).fill(null));
   const router = useRouter();
   const { address } = useAccount();

   const create_profileMutation = trpc.profile.create_profile.useMutation({
      onSuccess: (data) => {
         console.log("signup success:", data.profile.userId, data.message);
      },
      onError: (err) => {
         console.error("signup failed:", err.message);
      },
   });

   const token = localStorage.getItem('token');
   
   if(!token) {
      router.push('/auth/login')
      return
   }

   function handleSubmit(e: FormEvent) {
      e.preventDefault()
      const arr = ref.current.map(val => val?.value);

      const name = arr[0];
      const about = arr[1];
      const links = arr[2];

      create_profileMutation.mutateAsync({
         name: name!,
         address: address!,
         about: about!,
         links: [links!]
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
                  Create your profile
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6 justify-center h-full relative -top-0 md:-top-2">
                     
                     <InputBox refrence={(e) => ref.current[0] = e}
                        typeOfIn={'text'}
                        placeHolder={'Full name'}
                     />
                     
                     <InputBox refrence={(e) => ref.current[1] = e}
                        typeOfIn={'text'}
                        placeHolder={'About'}
                     />
                     
                     <InputBox refrence={(e) => ref.current[2] = e}
                        typeOfIn={'text'}
                        placeHolder={'links'}
                     />
                     <Button varient='default' size="md" className="rounded-md w-full" handleClick={() => ''}>
                        Create Profile
                     </Button>
                  </div>
               </form>
            </div>
         </Box>
      </div>
   )
}


// user mail , wallet address get by connnect using wallet not take by using input box and, user password. 
export default CreateProfilePage
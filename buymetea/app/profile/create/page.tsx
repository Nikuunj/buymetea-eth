"use client"
import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import { trpc } from "@/utils/trpc";
import { Box } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useAccount } from "wagmi";

function ProfileCreatePage() {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(3).fill(null));
   const { address } = useAccount();

   const creater_profileMutation = trpc.profile.create_profile.useMutation({
      onSuccess: (data) => {
         console.log("create profile success:", data, data.message);
      },
      onError: (err) => {
         console.error("create profile failed:", err.message);
      },
   });

   function handleSubmit(e: FormEvent) {
      e.preventDefault();

      const arr = ref.current.map(val => val?.value);

      creater_profileMutation.mutateAsync({
         name: arr[0]!,
         address: address!,
         about: arr[1]!,
         links: [arr[2]!]
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
                        typeOfIn={'email'}
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
                     <Button varient='default' size="md" 
                     className="rounded-md w-full" handleClick={() => ''}>
                        Create Profile
                     </Button>
                  </div>
               </form>
            </div>
         </Box>
      </div>
   )
}

export default ProfileCreatePage
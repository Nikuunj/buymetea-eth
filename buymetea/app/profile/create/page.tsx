"use client"
import Button from "@/components/ui/Button"
import InputBox from "@/components/ui/InputBox"
import Box from "@/components/User/Box"
import { trpc } from "@/utils/trpc";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ConnectBtn from "@/components/ui/ConnectBtn";
import { PowerIcon } from "lucide-react";


function CreateProfilePage() {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(3).fill(null));
   const router = useRouter();
   const { address } = useAccount();

   useEffect(() => {
      if (typeof window !== "undefined") {
         const token = localStorage.getItem("token");
         if (!token) {
            router.push("/auth/login");
            return;
         }
      }
   }, [router]);
   const create_profileMutation = trpc.profile.create_profile.useMutation({
      onSuccess: (data) => {
         console.log("signup success:", data.profile.userId, data.message);
      },
      onError: (err) => {
         if(err.data?.code == "UNAUTHORIZED") {
            router.push('/auth/login')  
         }
         console.error("signup failed:", err.message);
         return;
      },
   });

   function handleSubmit() {
      const arr = ref.current.map(val => val?.value);
      if(!address) {
         alert('please connect wallet');
         return;
      }

      const name = arr[0];
      const about = arr[1];
      const links = arr[2];

      create_profileMutation.mutateAsync({
         name: name!,
         address: address,
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

                  <p className="border max-w-56 min-w-56 text-base text-emerald-800 rounded-md  flex justify-between">
                     <p className="px-3 py-2 truncate">
                        {address ? address : 'Connect Wallet'} 
                     </p>
                     <ConnectBtn size="none" className="p-1 px-3 h-full rounded-none rounded-r-md"><PowerIcon className=""/></ConnectBtn>
                  </p> 
                  <Button varient='default' size="md" className="rounded-md w-full" handleClick={handleSubmit}>
                     Create Profile
                  </Button>
               </div>
            </div>
         </Box>
      </div>
   )
}


// user mail , wallet address get by connnect using wallet not take by using input box and, user password. 
export default CreateProfilePage
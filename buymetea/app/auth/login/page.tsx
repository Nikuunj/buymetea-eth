"use client"
import Button from "@/components/ui/Button"
import InputBox from "@/components/ui/InputBox"
import Box from "@/components/User/Box"
import { FormEvent, useRef } from "react";

function Loginpage() {
   const ref = useRef<(HTMLInputElement | null)[]>(Array(3).fill(null));

   function handleSubmit(e: FormEvent) {
      e.preventDefault()
      console.log('hi there');
   }
   return (
      <div className="flex gap-3">
         {/* <Box>
            <div className=" min-w-md"></div>
         </Box> */}
         <Box>
            <div className="md:py-15 pt-15 md:px-15 col-span-2 flex flex-col gap-5">
            <div className="text-xl font-semibold text-emerald-800">
               Welcome Back
            </div>
            <form onSubmit={handleSubmit}>
               <div className="flex flex-col gap-5 justify-center h-full relative -top-0 md:-top-2">
                  <p className="text-emerald-500">Email / Username</p>
                  <InputBox refrence={(e) => ref.current[0] = e}
                     typeOfIn={'text'}
                     placeHolder={'email / username'}
                  />
                  <p className="text-emerald-500">Password</p>
                  <InputBox refrence={(e) => ref.current[2] = e}
                     typeOfIn={'password'}
                     placeHolder={'password'}
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
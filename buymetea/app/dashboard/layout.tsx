"use client"
import LeftSide from "@/components/dashboard/LeftSide"
import { useRouter } from "next/navigation";
import { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
   // const router = useRouter();

   // const token = localStorage.getItem('token');
   
   // if(!token) {
   //    router.push('/auth/login')
   //    return;
   // }
   return (
      <div className="grid grid-cols-11">
         <LeftSide />
         {children}
      </div>
   )
}

export default layout
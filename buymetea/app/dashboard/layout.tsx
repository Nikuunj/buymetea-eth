"use client"
import LeftSide from "@/components/dashboard/LeftSide"
import MainDashbaord from "@/components/dashboard/MainDashbaord";
import Navbar from "@/components/NavFooter/Navbar";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react"

function Layout({ children }: { children: ReactNode }) {
   const router = useRouter();
   const [username, setUsername] = useState('');

   useEffect(() => {
      if (typeof window !== "undefined") {
         const token = localStorage.getItem("token");
         const userName = localStorage.getItem("userName") || "";

         if (!token) {
            router.push("/auth/login");
            return;
         }

         setUsername(userName);
      }
   }, [router]);

   return (
      <>
         <Navbar isBuy={true} name={`@${username}`} />
         <div className="grid grid-cols-11">
            <LeftSide />
            <MainDashbaord>
               {children}
            </MainDashbaord>
         </div>
      </>
   );
}

export default Layout;

"use client"
import LeftSide from "@/components/dashboard/LeftSide"
import MainDashbaord from "@/components/dashboard/MainDashbaord";
import Navbar from "@/components/NavFooter/Navbar";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react"

function layout({ children }: { children: ReactNode }) {
   const router = useRouter();
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
   const [userName, setUserName] = useState<string | null>(null);


   
   useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUserName = localStorage.getItem('userName');

      if (!token) {
         router.push('/auth/login');
      } else {
         setIsAuthenticated(true);
         setUserName(storedUserName);
      }
  }, [router]);
  
   return (
      <>
         <Navbar isBuy={true} name={`@${userName}`}/>
         <div className="grid grid-cols-11">
            <LeftSide />
            <MainDashbaord>
               {children}
            </MainDashbaord>
         </div>
      </>
   )
}

export default layout
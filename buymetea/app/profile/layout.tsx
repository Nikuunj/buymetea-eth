import Navbar from "@/components/NavFooter/Navbar"
import { ReactNode } from "react"


function layout({ children }: { children: ReactNode }) {
   return (
      <>
         <Navbar isBuy={true} name={" "}/>
         <div className="flex justify-center items-center min-h-screen bg-green-50">
            {children}
         </div>
      </>
   )
}

export default layout
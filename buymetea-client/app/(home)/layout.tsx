import Navbar from "@/components/NavHead/Navbar"
import { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
   return (
      <>
         <Navbar />
         {children}
      </>
   )
}

export default layout
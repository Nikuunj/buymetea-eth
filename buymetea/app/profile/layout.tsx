import { ReactNode } from "react"


function layout({ children }: { children: ReactNode }) {
   return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
         {children}
      </div>
   )
}

export default layout
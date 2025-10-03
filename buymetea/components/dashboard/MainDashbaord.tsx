import { ReactNode } from "react"
import RightSide from "./RightSide"

function MainDashbaord({ children }: { children: ReactNode }) {
   return (
      <div className="w-full max-h-screen min-h-screen overflow-y-scroll col-span-9 flex flex-col justify-center items-center  px-2 sm:px-10">
         {children}
      </div>
   )
}

export default MainDashbaord
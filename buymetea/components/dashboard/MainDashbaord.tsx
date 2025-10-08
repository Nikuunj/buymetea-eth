import { ReactNode } from "react"

function MainDashbaord({ children }: { children: ReactNode }) {
   return (
      <div className="w-full min-h-[90.5vh] overflow-hidden col-span-11 md:col-span-9 flex flex-col justify-center items-center">
         {children}
      </div>
   )
}

export default MainDashbaord
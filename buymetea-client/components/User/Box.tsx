import { ReactNode } from "react"

function AboutBox({ children }: { children: ReactNode }) {
   return (
      <div className=" p-8  bg-white rounded-2xl h-fit">{children}</div>
   )
}

export default AboutBox

import Link from "next/link"
import { ReactNode } from "react"

function ListBox({ children, to }: { children: ReactNode, to: string }) {
   return (
      <Link href={`./${to}`} className="w-full outline-0">
         <div className="cursor-pointer w-full bg-zinc-100 p-4 space-y-1.5 rounded-md border border-zinc-200 ">{children}</div>
      </Link>
   )
}

export default ListBox
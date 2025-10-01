"use client"

import { usePathname, useRouter } from "next/navigation";

function DashboardLink({ to, text }: { to: string, text: string }) {
   const router = useRouter();
   const pathname = usePathname()

   const isActive = pathname === to


   return (
      <span 
         className={`hover:bg-zinc-100 p-2 rounded-lg transition-all duration-300 cursor-pointer  
         ${ isActive ? 'bg-zinc-200/70' : '' }`}
         onClick={() => router.push(to)}
         >
            {text}
      </span>
   )
}

export default DashboardLink
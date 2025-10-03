"use client"

import { links } from "@/utils/data/dashboardlink";
import { useRouter } from "next/navigation"
import DashboardLink from "../ui/DashboardLink";
import { PowerOff } from "lucide-react";
import { motion } from "framer-motion";

function LeftSide() {
   const router = useRouter();
   function logout() {
      localStorage.removeItem('token');
      router.push('.')
      return;
   }
   
   const renderLink = links.map((li, i) => <DashboardLink key={i + li.title} text={li.title} to={li.to} />)
   return (
      <div className=" w-full min-h-screen col-span-2 px-12 py-14 border-r border-zinc-300/55 flex flex-col justify-between">
         <div className="flex flex-col gap-2">
            {renderLink}
         </div>

         <motion.button 
         whileTap={{
            scale: 0.6
         }}
         transition={{ duration: 0.15 }}
         onClick={logout}
         className="hover:bg-red-100/90 p-2 w-fit rounded-full transition-all duration-300">
            <PowerOff  className="text-red-800"/>
         </motion.button>
      </div>
   )
}

export default LeftSide
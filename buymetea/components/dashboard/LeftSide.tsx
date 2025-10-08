"use client"

import { links } from "@/utils/data/dashboardlink";
import { useRouter } from "next/navigation"
import DashboardLink from "../ui/DashboardLink";
import { ListMinus, PowerOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../ui/Button";

function LeftSide() {
   const router = useRouter();
   const [open, setOpen] = useState(false);
   function logout() {
      router.push('.')
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      return;
   }
   
   const renderLink = links.map((li, i) => <DashboardLink key={i + li.title} text={li.title} to={li.to} />)
   return (
      <>
      <div className="fixed md:hidden right-16 sm:right-24 top-3.5 sm:top-4 z-[50]">
         <Button size="none" varient="outline" className="p-1  rounded-md" handleClick={() => setOpen(pre => !pre)}><ListMinus className="h-5 w-5"/></Button>
      </div>
         <div className={` absolute md:relative ${ open ? 'block bg-white z-[60]' : 'hidden' } w-full max-h-screen col-span-0 md:col-span-2 px-4 lg:px-12 py-14 border-r items-start border-zinc-300/80 md:flex flex-col justify-between`}>
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
      </>
   )
}

export default LeftSide
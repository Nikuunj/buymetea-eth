"use client"
import { ReactNode } from "react";
import { useDisconnect } from "wagmi";
import { motion } from "framer-motion";

export function Disconnect({ children, className }: { children: ReactNode, className?: string }) {
   const {disconnect} = useDisconnect();
    
   return <div>
      <motion.button 
      whileTap={{ scale: 0.8 }}
      transition={{duration: 0.2}}
      className={`${className} cursor-pointer`} onClick={() => disconnect()}>
         {children}
      </motion.button>
   </div>
}
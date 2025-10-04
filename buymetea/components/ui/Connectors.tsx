"use client"
import Image from 'next/image'
import * as React from 'react'
import { useConnect } from 'wagmi'
import { motion } from "framer-motion";

export function Connectors({ handleClick }: { handleClick: () => void }) {
   const { connectors, connect } = useConnect()

   return connectors.map((connector, idx) => {
      const iconSrc = connector.icon?.trim() || null
      const isDataUri = iconSrc?.startsWith("data:")

      return (
         <React.Fragment key={connector.uid}>
         <motion.button
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * idx, duration: 0.2 }}
            onClick={() => { 
               connect({ connector });
               handleClick();
               }
            }
            className="cursor-pointer max-w-64 break-words flex items-center gap-2 border w-full ps-3 pe-7 py-3 rounded-lg border-gray-400 hover:bg-emerald-800/30"
         >
            {iconSrc &&
               (isDataUri ? (
               // fallback for base64/data URIs
               <Image
                  src={iconSrc}
                  width={27}
                  height={27}
                  alt={connector.name}
                  className='rounded'
               />
               ) : (
               // optimized for remote/local images
               <Image
                  src={iconSrc}
                  width={27}
                  height={27}
                  alt={connector.name}
               />
               ))}

            {connector.name}
         </motion.button>
         <br />
         </React.Fragment>
      )
   })
}
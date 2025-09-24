'use client'
import { ReactNode } from "react";
import { motion } from 'framer-motion';

interface ButtonProps {
   children: ReactNode;
   varient: 'none' | 'default' | 'outline' | 'shine' | 'submit';
   size: 'sm' | 'md' | 'lg';
   className?: string;
   handleClick?: () => void;
}

function Button({ children, className, varient, size, handleClick }: ButtonProps) {

   const style = {
      none: 'hover:bg-green-100',
      default: 'bg-amber-300 hover:bg-amber-400/90',
      outline: 'border-2 border-green-300',
      shine: '',
      submit: ''
   }

   const sizes = {
      sm: 'px-4 py-3',
      md: 'px-15 py-2.5',
      lg: 'px-13 py-5'
   }


   const defaultStyle = 'w-fit outline-0 cursor-pointer transition-all duration-300'
   return (
      <motion.button 
         whileHover={{ scale: 1.04 }}  
         whileTap={{ scale: 0.6 }}  
         transition={{ duration: 0.2 }}
         className={`${className} ${defaultStyle} ${sizes[size]} ${style[varient]}`} onClick={handleClick}>
         {children}
      </motion.button>
   )
}

export default Button
import { ReactNode } from "react";

interface ButtonProps {
   children: ReactNode;
   varient: 'default' | 'outline' | 'shine' | 'submit';
   size: 'sm' | 'md' | 'lg';
   className?: string;
   handleClick?: () => void;
}

function Button({ children, className, varient, size, handleClick }: ButtonProps) {

   const style = {
      default: 'bg-amber-300 hover:bg-amber-400/90',
      outline: '',
      shine: '',
      submit: ''
   }

   const sizes = {
      sm: 'px-8 py-1.5',
      md: 'px-15 py-2.5',
      lg: 'px-13 py-5'
   }


   const defaultStyle = 'w-fit outline-0'
   return (
      <button className={`${className} ${defaultStyle} ${sizes[size]} ${style[varient]}`} onClick={handleClick}>
         {children}
      </button>
   )
}

export default Button
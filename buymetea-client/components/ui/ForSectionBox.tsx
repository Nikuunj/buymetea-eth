import { Check } from "lucide-react"

function ForSectionBox({ text }: { text: string }) {
   
   return (
      <div className="flex gap-7 sm:gap-10 items-start">
         <div className="border-2 rounded-full h-fit p-1 mt-2">
            <Check  className="h-4 sm:h-6 w-4 sm:w-6"/>
         </div>
         <div className="max-w-72 text-lg sm:text-xl">
            {text}
         </div>
      </div>
   )
}

export default ForSectionBox
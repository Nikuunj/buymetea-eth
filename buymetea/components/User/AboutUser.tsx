import { Heart } from "lucide-react"

function AboutUser({ name, aboutText }: { name: string, aboutText: string }) {

   return (
      <div className="max-w-md space-y-6 text-[15px] h-fit">
         <h2 className="font-medium capitalize">
            About {name}
         </h2>
         <p className=" whitespace-break-spaces text-gray-700 font-light">
         {aboutText}
         </p>
         <div>
            link
         </div>
         <hr className="text-gray-300"/>

         <div className="space-y-5">
            <p className="text-lg font-semibold">
               Recent supporters
            </p>

            <div className="p-12 text-center gap-3.5 bg-purple-600/10 rounded-2xl flex flex-col justify-between items-center
            text-sm text-purple-500">
               <Heart className="w-5 h-5 fill-purple-600 text-purple-600 animate-ping "/>
               Be the first one to support Nikunj Makwana.
            </div>
         </div>
      </div>
   )
}

export default AboutUser
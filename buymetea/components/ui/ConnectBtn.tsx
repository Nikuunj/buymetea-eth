import { ReactNode, useState } from "react"
import Button from "./Button";
import { XIcon } from "lucide-react";
import { Connectors } from "./Connectors";

function ConnectBtn({ children }: { children: ReactNode }) { 
   const [open, setOpen] = useState<boolean>(false);
   return (
      <div>
         <Button 
         size="md"
         varient="tip"
         className="w-full rounded-full"
         handleClick={() => setOpen(true)}>
            {children}
         </Button>
         { open &&
            <div className="flex justify-center fixed top-0 left-0 items-center bg-black/20 min-h-screen min-w-screen" onClick={() => setOpen(false)}>
               <section className="border bg-zinc-200/90 border-zinc-300  p-10 rounded-lg w-fit items-start flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <Button varient='outline' size="sm" className="rounded-lg mb-5 hover:bg-red-300/60" handleClick={() => setOpen(false)}>
                     <XIcon className="h-5 w-5 text-red-700 "/>
                  </Button>
                  <Connectors handleClick={() => setOpen(false)}/> 
               </section>
            </div>
         }
      </div>
   )
}

export default ConnectBtn
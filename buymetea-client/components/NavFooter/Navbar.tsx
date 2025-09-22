import Button from "../ui/Button"

function Navbar({ isBuy, name }: { isBuy?: boolean, name?: string }) {
   return (
      <nav className="absolute w-full  z-50 py-3.5 bg-white px-2 sm:px-10 flex justify-between items-center">
         <h1 className="dancing-script font-bold text-2xl sm:text-3xl">
            Buy me Tea
         </h1>
         <div className="text-base font-medium space-x-1 capitalize">
            {isBuy && name ? name : <>
               <Button className="rounded-full" size='sm' varient='none'>Log in</Button>
               <Button className="rounded-full" size='sm' varient='default'>Sign up</Button>
            </>
            }
         </div>
      </nav>
   )
}

export default Navbar
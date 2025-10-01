
function LeftSide() {
   return (
      <div className=" w-full min-h-screen col-span-2 flex flex-col gap-2 px-12 py-14 border-r border-zinc-300/55 ">
         <span className="hover:bg-zinc-200 p-2 rounded-lg transition-all duration-300 w-fit cursor-pointer">
            Home
         </span>
         <span className="hover:bg-zinc-200 p-2 rounded-lg transition-all duration-300 w-fit cursor-pointer">
            Messages
         </span>
         <span className="hover:bg-zinc-200 p-2 rounded-lg transition-all duration-300 w-fit cursor-pointer">
            Transaction
         </span>
         <span className="hover:bg-zinc-200 p-2 rounded-lg transition-all duration-300 w-fit cursor-pointer">
            History
         </span>
         <span className="hover:bg-zinc-200 p-2 rounded-lg transition-all duration-300 w-fit cursor-pointer">
            Deposit
         </span>
      </div>
   )
}

export default LeftSide
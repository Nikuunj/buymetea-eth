import MsgList from "@/components/dashboard/MsgList"

function MessagePage() {
   return (
      <div className="w-full min-h-screen col-span-9 flex flex-col justify-center items-center px-2 sm:px-10">
         <MsgList to={'111'} />
      </div>
   )
}

export default MessagePage
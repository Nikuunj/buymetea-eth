"use client"

import MsgList from "@/components/dashboard/messages/MsgList";
import { trpc } from "@/utils/trpc";

function MessagePage() {

   const { data, isLoading, isError, error } = trpc.message.getMsgListForDashboard.useQuery(undefined,
      {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
      }
   );

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      return <div>Error: {error.message}</div>
   }

   if (!data?.msg_list.length) {
      return <div>No Message found.</div>
   }

   const renderMsg = data.msg_list.map(msg => <MsgList id={msg.id} name={msg.name} say={msg.say} />)
   return (
      <div className="flex flex-col gap-4 w-full px-2 sm:px-10">
         {renderMsg}
      </div>
   )
}

export default MessagePage
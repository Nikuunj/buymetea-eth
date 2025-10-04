"use client"
import DepositList from "@/components/dashboard/history/DepositList";
import { trpc } from "@/utils/trpc";

function HistoryPage() {

   const { data, isLoading, isError, error } = trpc.deposit.get_depositList.useQuery(undefined,
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

   if (!data?.deposit_list.length) {
      return <div>No Deposit found.</div>
   }
   const renderDeposit = data.deposit_list.map(deposit => <DepositList key={deposit.transactionId} id={deposit.transactionId} />)
   return (
      <div className="flex flex-col gap-4 w-full px-2 sm:px-10">
         {renderDeposit}
      </div>
   )
}

export default HistoryPage
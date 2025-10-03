"use client"
import DepositList from "@/components/dashboard/DepositList"
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
   const renderDeposit = data.deposit_list.map(deposit => <DepositList id={deposit.transactionId} />)
   return (
      <>
         {renderDeposit}
      </>
   )
}

export default HistoryPage
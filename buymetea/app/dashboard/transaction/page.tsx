"use client"
import TxList from "@/components/dashboard/transaction/TxList";
import { trpc } from "@/utils/trpc";
import { ethers } from "ethers";

function TransactionPage() {
   const { data, isLoading, isError, error } = trpc.tx.get_txList.useQuery(undefined,
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

   if (!data?.tx_list.length) {
      return <div>No Transaction found.</div>
   }

   const renderTxs = data.tx_list.map(tx => <TxList id={tx.id} amount={ethers.utils.formatEther(tx.amount)} from={tx.from} tokenName={tx.tokenName}/>)
   return (
      <div className="flex flex-col gap-4 w-full px-2 sm:px-10">
         {renderTxs}
      </div>
   )
}

export default TransactionPage

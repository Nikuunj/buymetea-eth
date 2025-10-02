import TxList from "@/components/dashboard/TxList"

function TransactionPage() {
   return (
      <div className="w-full min-h-screen col-span-9 flex justify-center items-center  px-2 sm:px-10">
         <TxList to={'111'} />
      </div>
   )
}

export default TransactionPage

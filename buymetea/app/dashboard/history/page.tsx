import DepositList from "@/components/dashboard/DepositList"

function HistoryPage() {
   return (
      <div className=" w-full min-h-screen col-span-9 flex justify-center items-center  px-2 sm:px-10">
         <DepositList to={'111'} />
      </div>
   )
}

export default HistoryPage
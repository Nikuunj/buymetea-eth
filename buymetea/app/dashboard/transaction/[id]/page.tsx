import TransactionId from "@/components/dashboard/transaction/TransactionId";

async function Idpage({ params }: { params: Promise<{ id: string }> }) {
   const resolvedParams = await params;
   const id = resolvedParams.id;
   return (
      <TransactionId id={id} />
   )
}

export default Idpage
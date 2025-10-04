import MessageId from "@/components/dashboard/messages/MessageId";

async function Idpage({ params }: { params: Promise<{ id: string }> }) {
   const resolvedParams = await params;
   const id = resolvedParams.id;
   return (
      <MessageId id={id} />
   )
}

export default Idpage

async function Idpage({ params }: { params: Promise<{ id: string }> }) {
   const resolvedParams = await params;
   const id = resolvedParams.id;
   return (
      <div>{id}</div>
   )
}

export default Idpage
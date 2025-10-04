import ListBox from "../ListBox"

function TxList({ id, amount, from, tokenName }: { id: string, amount: string, from: string, tokenName: string }) {
   return (
      <ListBox to={`transaction/${id}`}>
         <div className="flex justify-between">
               <span>id: <span className="text-zinc-600">{id}</span></span>
               <span>{amount} {tokenName}</span>
            </div>
            <div className="flex justify-between">
               <span>from: <span className="text-zinc-600">{from}</span></span>
               <span>view</span>
            </div>
      </ListBox>
   )
}

export default TxList
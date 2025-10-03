import ListBox from "./ListBox"

function TxList({ id, amount, from, tokenName }: { id: string, amount: number, from: string, tokenName: string }) {
   return (
      <ListBox to={`transaction/${id}`}>
         <div className="flex justify-between">
               <span>{id}</span>
               <span>{amount} {tokenName}</span>
            </div>
            <div className="flex justify-between">
               <span>{from}</span>
               <span>view</span>
            </div>
      </ListBox>
   )
}

export default TxList
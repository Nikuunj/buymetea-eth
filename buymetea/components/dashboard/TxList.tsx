import ListBox from "./ListBox"

function TxList({ to }: { to: string }) {
   return (
      <ListBox to={`transaction/${to}`}>
         <div className="flex justify-between">
               <span>tx id</span>
               <span>amont</span>
            </div>
            <div className="flex justify-between">
               <span>from</span>
               <span>view</span>
            </div>
      </ListBox>
   )
}

export default TxList
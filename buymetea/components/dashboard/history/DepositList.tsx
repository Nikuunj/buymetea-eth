import ListBox from "../ListBox"

function DepositList({ id }: { id: string }) {
   
   return (
      <ListBox to={`history/${id}`}>
         <div className="flex justify-between">
            <span>{id}</span>
            <span>view</span>
         </div>
      </ListBox>
   )
}

export default DepositList
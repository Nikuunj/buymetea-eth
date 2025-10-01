import ListBox from "./ListBox"

function DepositList({ to }: { to: string }) {
   
   return (
      <ListBox to={`history/${to}`}>
         <div className="flex justify-between">
            <span>tx id</span>
            <span>view</span>
         </div>
      </ListBox>
   )
}

export default DepositList
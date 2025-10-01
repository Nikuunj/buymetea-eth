import ListBox from "./ListBox"

function MsgList({ to }: { to: string }) {
   return (
      <ListBox to={`message/${to}`}>
         <div className="flex min-w-64 justify-between">
            <p>Name Name</p>
            <p>view</p>
         </div>   
         <p className="line-clamp-1 max-w-fit whitespace-break-spaces text-gray-700 font-light">
            msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user 
            msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user 
            msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user msg of user 
         </p>
      </ListBox>
   )
}

export default MsgList
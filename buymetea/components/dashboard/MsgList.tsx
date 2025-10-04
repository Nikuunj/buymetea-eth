import ListBox from "./ListBox"

function MsgList({ id, name, say }: { id: string, name: string, say: string }) {
   return (
      <ListBox to={`message/${id}`}>
         <div className="flex min-w-64 justify-between">
            <p>{name}</p>
            <p>view</p>
         </div>   
         <p className="line-clamp-1 max-w-fit whitespace-break-spaces text-gray-700 font-light">
            {say}
         </p>
      </ListBox>
   )
}

export default MsgList
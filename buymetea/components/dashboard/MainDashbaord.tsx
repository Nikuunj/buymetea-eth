import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

function MainDashbaord() {
   return (
      <div className="grid grid-cols-11">
         <LeftSide />
         <RightSide />
      </div>
   )
}

export default MainDashbaord
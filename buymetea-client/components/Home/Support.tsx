import Box from "../ui/Box";
import SameBoxHelper from "./SameBoxHelper";


function Support() {
   return (
      <Box>
         <SameBoxHelper 
            header="Support" 
            title="Give your audiencean easy way to say thanks."  
            describe="Buy Me a Coffee makes supporting fun and easy. In 
            just a couple of taps, your fans can make the payment (buy you a coffee) and leave a message."/>

          <div className="w-full max-w-full sm:max-w-md text-left space-y-4 select-none border border-rose-200 rounded-3xl bg-white px-4 py-6 sm:px-6 sm:py-10">

            {/* Title */}
            <h2 className="text-xl font-semibold text-balance">Buy {'{_username_}'} a Tea</h2>

            {/* Static Coffee Amount Display */}
            <div className="flex items-center gap-2 border border-red-100 rounded-xl p-4 shadow-sm bg-white">
               <span role="img" aria-label="coffee">☕</span>
               <span className="text-gray-600">x</span>

               {/* Preselected Button */}
               <button className="w-10 h-10 rounded-full bg-red-500 text-white font-semibold flex items-center justify-center">
                  1
               </button>

               {/* Other Buttons (display only) */}
               <button className="w-10 h-10 rounded-full border border-red-300 text-red-500 font-semibold flex items-center justify-center">
                  3
               </button>
               <button className="w-10 h-10 rounded-full border border-red-300 text-red-500 font-semibold flex items-center justify-center">
                  5
               </button>

               {/* Input field (static) */}
               <input
                  type="number"
                  value="1"
                  readOnly
                  className="w-12 h-10 outline-0 border border-gray-300 rounded-md text-center bg-gray-100 text-gray-500"
               />
            </div>

            {/* Static Message Area */}
            <div className="w-full h-24 border border-gray-200 rounded-xl p-4 bg-white text-gray-400">
               Say something nice...
            </div>

            {/* Static Button */}
            <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-3xl shadow-md">
               Support $3
            </button>
         </div>
      </Box>
   );
}

export default Support;

'use client'
import { FormEvent, useState } from "react";

function BuyForm() {
   const [count, setCount] = useState(1);
   const [name, setName] = useState("");
   const [message, setMessage] = useState("");
   const pricePerTea = 60; // ₹60 per tea
   const total = isNaN(count) ? 0 : count * pricePerTea;


   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      const formData = {
         name,
         message,
         count,
         total,
      };

      console.log("Form Submitted:", formData);

      setName("");
      setMessage("");
      setCount(1);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="max-w-md mx-auto space-y-6 "
      >

         <h2 className="text-xl font-semibold">
            Buy Nikunj Makwana a Tea 🍵
         </h2>

         <div className="flex items-center justify-center space-x-4 bg-purple-50 border border-purple-300 rounded-xl px-3 py-4">
            <span className="text-4xl">🍵</span>
            <div className="flex space-x-3">
               {[1, 3, 5].map((num) => (
               <button
                  type="button"
                  key={num}
                  onClick={() => setCount(num)}
                  className={`px-5 py-3 transition-all duration-300 outline-0 rounded-full border text-lg  ${
                     count === num
                     ? "bg-purple-400 text-white font-semibold border-purple-400"
                     : "text-purple-600 border-gray-300 hover:bg-purple-100"
                  }`}
               >
                  {num}
               </button>
               ))}
               <input
                  type="number"
                  placeholder="10"
                  value={isNaN(count) ? "" : count}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value === "") {
                        setCount(NaN);
                     } else {
                        setCount(Number(value));
                     }
                  }}
                  className="w-12 px-2 py-2 rounded-lg border border-gray-300 text-center outline-0"
                  />
            </div>
         </div>

         <input
            type="text"
            placeholder="Name or @yoursocial"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full transition-all duration-300 outline-0 px-4 py-3 bg-gray-200 focus:bg-white
            rounded-lg  focus:ring-2 focus:ring-purple-400"
         />
         <textarea
            placeholder="Say something nice..."
            value={message}
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 transition-all duration-300
            bg-gray-200 focus:bg-white rounded-lg outline-0 focus:ring-2 focus:ring-purple-400"
            />

         {/* Tip button */}
         <button
         type="submit"
         className="w-full py-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-md transition"
         >
            Tip ₹{total}
         </button>
      </form>
   );
}

export default BuyForm;

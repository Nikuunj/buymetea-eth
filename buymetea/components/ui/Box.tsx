import { ReactNode } from "react";

function Box({ children }: { children: ReactNode }) {
   return (
      <div className="bg-gray-50 text-center rounded-[45px] py-10 sm:py-16 px-4 sm:px-10 md:px-16 space-y-6 sm:space-y-9 w-full max-w-7xl flex flex-col items-center justify-center">
         {children}
      </div>
   );
}

export default Box;

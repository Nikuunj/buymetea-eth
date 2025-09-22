interface SameBoxHelperProps {
   title: string;
   describe: string;
   header: string;
}

function SameBoxHelper({ title, describe, header }: SameBoxHelperProps) {
   return (
      <>
         <h1 className="text-base font-medium uppercase text-gray-500">
            {header}
         </h1>
         <h2 className="text-3xl/9 sm:text-4xl/14 md:text-5xl/17 lg:text-6xl/20 max-w-2xl sm:max-w-3xl text-balance font-semibold">
            {title}
         </h2>
         <h2 className="text-base sm:text-lg md:text-xl max-w-4xl">
            {describe}
         </h2>
      </>
   )
}

export default SameBoxHelper
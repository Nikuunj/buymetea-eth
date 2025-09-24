import SecondryHeaderText from "../ui/SecondryHeaderText";

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
         <SecondryHeaderText text={title} />
         <h2 className="text-base sm:text-lg md:text-xl max-w-4xl">
            {describe}
         </h2>
      </>
   )
}

export default SameBoxHelper
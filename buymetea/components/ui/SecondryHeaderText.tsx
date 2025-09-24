
function SecondryHeaderText({ text, className }: { text: string, className?: string }) {
   return (
      <h2 className={`${className} text-3xl/9 sm:text-4xl/14 md:text-5xl/17 lg:text-6xl/20 max-w-2xl sm:max-w-3xl text-balance font-semibold`}>
         {text}
      </h2>
   )
}

export default SecondryHeaderText


function TextWithHeader({ header, text }: { header: string, text: string }) {
   return (
      <div className="border-b space-y-3 py-5.5 px-4 sm:px-14 border-zinc-300/80">
         <p className="font-medium capitalize">
            {header}
         </p>
         <p className="break-words text-zinc-700 whitespace-break-spaces">
            {text}
         </p>
      </div>
   )
}

export default TextWithHeader
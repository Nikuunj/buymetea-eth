
function TextWithHeader({ header, text }: { header: string, text: string }) {
   return (
      <div className="border-b space-y-2 p-4 border-zinc-200">
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
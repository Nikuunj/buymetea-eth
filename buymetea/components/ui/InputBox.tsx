interface InputBoxProps {
   refrence: (instance: HTMLInputElement | null) => void;
   placeHolder: string;
   typeOfIn: "text" | "password" | "email" | "number";
   defaultVal?: string
}

function InputBox({ refrence, placeHolder, typeOfIn, defaultVal }: InputBoxProps) {
   return (
      <input type={typeOfIn} 
         ref={refrence} 
         className="border outline-0 px-3  py-2 text-base text-emerald-800 rounded-md" 
         placeholder={placeHolder} 
         defaultValue={defaultVal}
      />
   )
}

export default InputBox
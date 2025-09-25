import Button from "../ui/Button"
import { StarIcon } from 'lucide-react';

function Hero() {
   const renderStar = Array(5).fill(0).map((v, i) => <StarIcon key={v + i} className="w-3 sm:w-5 h-3 sm:h-5 fill-emerald-700 text-emerald-700"/>)
   return (
      <div className="relative top-0 sm:top-3 w-full min-h-screen mb-5  text-center flex flex-col gap-11 sm:gap-5  md:gap-7  xl:gap-10 justify-center items-center">
         <p className="flex flex-col md:flex-row justify-center items-center gap-5 text-sm sm:text-base font-normal px-5 sm:px-0 
         max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl  text-balance">
            <span className="flex gap-2.5">
               {renderStar} 
            </span>
            Loved by 1,000,000+ creators
         </p>
         <div className="space-y-7">
            <h1 className=" font-semibold tracking-tight dm-sans text-4xl/12 sm:text-6xl/20 md:text-7xl/24 lg:text-8xl/30 
            max-w-md sm:max-w-lg md:max-w-2xl text-balance px-5 sm:px-0">
               Fund your creative work
            </h1>

            <p className="text-md sm:text-xl md:text-2xl px-5 sm:px-0 
            max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl font-light">
               Accept support. Start a membership. Setup a shop. It’s easier than you think.
            </p>
         </div>

         <div className="space-y-7">
            <Button className={`text-xl rounded-full font-semibold`} size='lg' varient='default'>
               Start my page
            </Button>

            <p className="text-sm sm:text-base font-normal px-5 sm:px-0 
            max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl  text-balance">
               It’s free and takes less than a minute!
            </p>
         </div>
      </div>
   )
}

export default Hero
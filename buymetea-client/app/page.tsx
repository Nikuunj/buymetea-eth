import Hero from "@/components/Home/Hero";
import Support from "@/components/Home/Support";

export default function Home() {
   return (
      <div className="min-h-screen relative top-7 justify-center items-center flex  flex-col px-2">
         <Hero /> 
         <Support />
      </div>
   );
}

import ForSection from "@/components/Home/ForSection";
import Hero from "@/components/Home/Hero";
import Memberships from "@/components/Home/Memberships";
import Support from "@/components/Home/Support";

export default function Home() {
   return (
      <div className="min-h-screen relative top-7 justify-center items-center flex  flex-col px-2 pb-17">
         <Hero /> 

         <div className="space-y-25">
            <Support />
            <Memberships />
            <ForSection />
         </div>
      </div>
   );
}

"use client"

import { links } from "@/utils/data/dashboardlink";
import { useRouter } from "next/navigation"
import DashboardLink from "../ui/DashboardLink";

function LeftSide() {
   const router = useRouter();

   function route(to: string) {
      router.push(to);
      return;
   }

   const renderLink = links.map((li, i) => <DashboardLink key={i + li.title} text={li.title} to={li.to} />)
   return (
      <div className=" w-full min-h-screen col-span-2 flex flex-col gap-2 px-12 py-14 border-r border-zinc-300/55 ">
         {renderLink}
      </div>
   )
}

export default LeftSide
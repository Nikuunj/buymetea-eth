import { initTRPC } from "@trpc/server";
import SuperJSON from 'superjson';
import { prisma } from "@/prisma";

export async function createContext() {
  return { prisma };
}

export const t = initTRPC.context<typeof createContext>().create({
   transformer: SuperJSON
});
export const router = t.router;
export const publicProcedure = t.procedure;
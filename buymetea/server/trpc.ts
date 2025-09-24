import { initTRPC } from "@trpc/server";
import SuperJSON from 'superjson';
import { prisma } from "@/prisma";

export const t = initTRPC.context<typeof prisma>().create({
   transformer: SuperJSON
});
export const router = t.router;
export const publicProcedure = t.procedure;
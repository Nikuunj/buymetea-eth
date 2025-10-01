import { initTRPC } from "@trpc/server";
import SuperJSON from 'superjson';
import { prisma } from "@/prisma";

export async function createContext() {
    return { prisma, userId: undefined as string | undefined };
}

export type Context = Awaited<ReturnType<typeof createContext>>;


export const t = initTRPC.context<Context>().create({
    transformer: SuperJSON,
    errorFormatter({ shape }) {
        return shape;
    },
});
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
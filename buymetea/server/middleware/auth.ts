import { TRPCError } from "@trpc/server";
import { middleware } from "@/server/trpc";

export const isLogin = middleware(async ({ ctx, next }) => {
   const { userId } = ctx

   if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
   }
   return next({
      ctx: {
         ...ctx,
         userId,
      },
   });
})
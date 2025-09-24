import { publicProcedure, router } from "./trpc";

export const appRouter = router({
   getClient: publicProcedure.query(() => {
      return {
         msg : 'hi there'
      }
   })
});

export type AppRouter = typeof appRouter;

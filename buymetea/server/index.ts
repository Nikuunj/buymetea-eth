
import { authRouter } from "./routers/auth";
import { depositRouter } from "./routers/deposit";
import { massegeRouter } from "./routers/massege";
import { transactionRouter } from "./routers/transaction";
import { profileRouter } from "./routers/userProfile";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
   hi: publicProcedure
      .query(() => {
         return {
            msg: 'hi there'
         }
      }),
   deposit: depositRouter,
   massege: massegeRouter,
   tx: transactionRouter,
   auth: authRouter,
   profile: profileRouter
});

export type AppRouter = typeof appRouter;

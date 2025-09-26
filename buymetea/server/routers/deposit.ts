import { isLogin } from "../middleware/auth";
import { router, publicProcedure } from "../trpc";

export const depositRouter =  router({

   get_depositList: publicProcedure
      .use(isLogin)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all deposit of user'
         }
      }),
})
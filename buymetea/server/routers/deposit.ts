import { isLogin } from "../middleware/auth";
import { router, publicProcedure } from "../trpc";
import { get_user_id_name } from "../types/user.schema";

export const massegeRouter =  router({

   get_depositList: publicProcedure
      .use(isLogin)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all deposit of user'
         }
      }),
})
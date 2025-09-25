import { router, publicProcedure } from "../trpc";
import { get_user_id_name } from "../types/user.schema";

export const massegeRouter =  router({

   get_depositList: publicProcedure
      .input(get_user_id_name)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all deposit of user'
         }
      }),
})
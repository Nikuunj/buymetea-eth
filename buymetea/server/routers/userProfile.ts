import { isLogin } from "../middleware/auth";
import { router, publicProcedure } from "../trpc";
import { get_user_id_name, user_profile } from "../types/user.schema";

export const profileRouter =  router({

   create_profile: publicProcedure
      .use(isLogin)
      .input(user_profile)
      .mutation(async ({ input, ctx }) => {
         return {
            msg: 'create profile'
         }
      }),
   
   get_user_profile: publicProcedure 
      .input(get_user_id_name)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get user profile'
         }
      }),
})
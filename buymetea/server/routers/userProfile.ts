import { isLogin } from "@/server/middleware/auth";
import { router, publicProcedure } from "@/server/trpc";
import { get_user_id_name_schema, user_profile_schema } from "@/server/types/user.schema";

export const profileRouter =  router({

   create_profile: publicProcedure
      .use(isLogin)
      .input(user_profile_schema)
      .mutation(async ({ input, ctx }) => {
         return {
            msg: 'create profile'
         }
      }),
   
   get_user_profile: publicProcedure 
      .input(get_user_id_name_schema)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get user profile'
         }
      }),
})
import { router, publicProcedure } from "../trpc";
import { get_user_profile, user_profile } from "../types/user.schema";

export const profileRouter =  router({

   create_profile: publicProcedure
      .input(user_profile)
      .mutation(async () => {
         return {
            msg: 'create profile'
         }
      }),
   
   get_user_profile: publicProcedure 
      .input(get_user_profile)
      .query(() => {
         return {
            msg: 'get user profile'
         }
      }),
})
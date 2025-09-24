import { router, publicProcedure } from "../trpc";
import { email, string, z } from 'zod';
import { get_user_profile, user_login, user_profile, user_schema } from "../types/user.schema";

const authRouter =  router({

   create_user: publicProcedure
      .input(user_schema)
      .mutation(async ({ input }) => {
         return {
            msg : 'hi there'
         }
      }),

   create_profile: publicProcedure
      .input(user_profile)
      .mutation(async () => {
         return {
            msg: 'create profile'
         }
      }),

   login_user: publicProcedure
      .input(user_login)
      .mutation(() => {
         return {
            msg: 'login user'
         }
      }),
   
   get_user_profile: publicProcedure 
      .input(get_user_profile)
      .query(() => {
         return {
            msg: 'user profile'
         }
      }),
})
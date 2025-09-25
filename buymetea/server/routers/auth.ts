import { router, publicProcedure } from "../trpc";
import { user_login, user_schema } from "../types/user.schema";

export const authRouter =  router({

   create_user: publicProcedure
      .input(user_schema)
      .mutation(async ({ input, ctx }) => {
         return {
            msg : 'create user'
         }
      }),

   login_user: publicProcedure
      .input(user_login)
      .mutation(async ({ input, ctx }) => {
         return {
            msg: 'login user'
         }
      }),
})
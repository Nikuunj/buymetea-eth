import { user_create, user_login } from "@/server/action/user/auth";
import { router, publicProcedure } from "@/server/trpc";
import { user_create_schema, user_login_schema } from "@/server/types/user.schema";

export const authRouter =  router({

   create_user: publicProcedure
      .input(user_create_schema)
      .mutation(user_create),

   login_user: publicProcedure
      .input(user_login_schema)
      .mutation(user_login),
})
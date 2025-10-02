import { isLogin } from "@/server/middleware/auth";
import { router, publicProcedure } from "@/server/trpc";
import { get_user_id_name_schema, user_profile_schema } from "@/server/types/user.schema";
import { user_create_profile, user_get_full_profile, user_get_profile } from "@/server/action/user/profile";

export const profileRouter =  router({

   create_profile: publicProcedure
      .use(isLogin)
      .input(user_profile_schema)
      .mutation(user_create_profile),
   
   get_user_profile: publicProcedure 
      .input(get_user_id_name_schema)
      .query(user_get_profile),

   get_full_user_profile: publicProcedure 
      .use(isLogin)
      .input(get_user_id_name_schema)
      .query(user_get_full_profile),
})
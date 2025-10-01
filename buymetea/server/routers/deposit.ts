import { isLogin } from "@/server/middleware/auth";
import { router, publicProcedure } from "@/server/trpc";
import { deposit_list } from "@/server/action/deposit/deposit";

export const depositRouter =  router({

   get_depositList: publicProcedure
      .use(isLogin)
      .query(deposit_list),
})
import { isLogin } from "../middleware/auth";
import { router, publicProcedure } from "../trpc";
import { tx_id } from "../types/tx.schema";

export const massegeRouter =  router({

   getMsgList: publicProcedure
      .use(isLogin)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get list of msg profile'
         }
      }),
   
   getMsgById: publicProcedure 
      .use(isLogin)
      .input(tx_id)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get msg  detail'
         }
      }),
})
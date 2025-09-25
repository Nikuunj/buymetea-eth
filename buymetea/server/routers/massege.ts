import { router, publicProcedure } from "../trpc";
import { tx_id } from "../types/tx.schema";
import { get_user_id_name } from "../types/user.schema";

export const massegeRouter =  router({

   getMsgList: publicProcedure
      .input(get_user_id_name)
      .mutation(async ({ input, ctx }) => {
         return {
            msg: 'get list of msg profile'
         }
      }),
   
   getMsgById: publicProcedure 
      .input(tx_id)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get msg  detail'
         }
      }),
})
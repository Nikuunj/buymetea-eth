import { router, publicProcedure } from '../trpc'
import { get_user_id_name } from '../types/user.schema'
import { create_tx_deposit, create_tx_msg, tx_id } from '../types/tx.schema'
import { isLogin } from '../middleware/auth'

export const transactionRouter = router({

   get_txList: publicProcedure
      .use(isLogin)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all tx of user'
         }
      }),

   get_tx_id: publicProcedure
      .use(isLogin)
      .input(tx_id)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'retun user specifit tx'
         }
      }),
   

   create_tx_msg: publicProcedure
      .input(create_tx_msg)
      .mutation(async ({ input, ctx }) => {
         
         return {
            msg: 'create tx and msg of user'
         }
      }),
   
   create_tx_deposti: publicProcedure
      .input(create_tx_deposit)
      .mutation(async ({ input, ctx }) => {
         return {
            msg: 'create tx and deposit of user'
         }
      }),
})
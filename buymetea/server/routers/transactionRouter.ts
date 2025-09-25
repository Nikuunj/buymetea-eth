import { router, publicProcedure } from '../trpc'
import { get_user_id } from '../types/user.schema'
import { create_tx_deposit, create_tx_msg, tx_id } from '../types/tx.schema'

export const transactionRouter = router({

   txList: publicProcedure
      .input(get_user_id)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all tx of user'
         }
      }),

   depositList: publicProcedure
      .input(get_user_id)
      .query(async ({ input, ctx }) => {
         return {
            msg: 'get all deposit of user'
         }
      }),

   get_tx_id: publicProcedure
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
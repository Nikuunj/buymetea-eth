import { router, publicProcedure } from '@/server/trpc'
import { create_tx_deposit_schema, create_tx_msg_schema, tx_id } from '@/server/types/tx.schema'
import { isLogin } from '@/server/middleware/auth'
import { create_tx_deposit, create_tx_msg, get_tx_id, get_tx_list } from '@/server/action/transaction/transaction'

export const transactionRouter = router({

   get_txList: publicProcedure
      .use(isLogin)
      .query(get_tx_list),

   get_tx_id: publicProcedure
      .use(isLogin)
      .input(tx_id)
      .query(get_tx_id),
   

   create_tx_msg: publicProcedure
      .input(create_tx_msg_schema)
      .mutation(create_tx_msg),
   
   create_tx_deposit: publicProcedure
      .use(isLogin)
      .input(create_tx_deposit_schema)
      .mutation(create_tx_deposit),
})
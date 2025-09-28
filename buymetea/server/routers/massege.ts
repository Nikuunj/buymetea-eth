import { isLogin } from "@/server/middleware/auth";
import { router, publicProcedure } from "@/server/trpc";
import { tx_id } from "@/server/types/tx.schema";
import { get_user_id_name_schema } from "@/server/types/user.schema";
import { get_msg_id, get_msg_list } from "@/server/action/message/message";

export const massegeRouter =  router({

   getMsgList: publicProcedure
      .input(get_user_id_name_schema)
      .query(get_msg_list),
   
   getMsgById: publicProcedure 
      .use(isLogin)
      .input(tx_id)
      .query(get_msg_id),
})
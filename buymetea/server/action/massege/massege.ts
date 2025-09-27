import { Context } from "@/server/trpc";
import { tx_id_type } from "@/server/types/tx.schema";
import { get_user_id_name_type } from "@/server/types/user.schema";

export const get_msg_list = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {

}


export const get_msg_id = async ({ ctx, input }: { input: tx_id_type, ctx: Context }) => {

}

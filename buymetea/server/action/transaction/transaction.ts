import { Context } from "@/server/trpc";
import { create_tx_deposit_type, create_tx_msg_type, tx_id_type } from "@/server/types/tx.schema";

export const get_tx_list = async ({ ctx }: { ctx: Context }) => {
   
}


export const get_tx_id = async ({ input, ctx }: { input: tx_id_type, ctx: Context }) => {
   
}

export const create_tx = async ({ ctx }: { ctx: Context }) => {

}

export const create_tx_msg = async ({ input, ctx }: { input: create_tx_msg_type, ctx: Context }) => {
      
}

export const create_tx_deposit = async ({ input, ctx }: { input: create_tx_deposit_type, ctx: Context }) => {
      
}
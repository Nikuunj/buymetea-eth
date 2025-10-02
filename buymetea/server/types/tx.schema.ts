import { z } from 'zod';

export const create_tx_msg_schema = z.object({
   toUserId: z.number(),
   to_address: z.string().length(42).startsWith('0x'),
   amount: z.number().nonnegative(),
   txHash: z.string().length(66).startsWith('0x'),
   name: z.string(),
   say: z.string()
})

export const create_tx_deposit_schema = z.object({
   userId: z.number(),
   amount: z.number().nonnegative(),
   to_address: z.string().length(42).startsWith('0x'),
   txHash: z.string().length(66).startsWith('0x')
})

export const tx_id = z.object({
   id: z.string()
})

export type tx_id_type  = z.infer<typeof tx_id>;
export type create_tx_deposit_type  = z.infer<typeof create_tx_deposit_schema>;
export type create_tx_msg_type  = z.infer<typeof create_tx_msg_schema>;
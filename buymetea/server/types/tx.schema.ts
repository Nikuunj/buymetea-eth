import { z } from 'zod';

export const create_tx_msg = z.object({
   toUserId: z.number(),
   amount: z.number().nonnegative(),
   txHash: z.string().length(66),
   name: z.string(),
   say: z.string()
})

export const tx_id = z.object({
   id: z.string()
})

export const create_tx_deposit = z.object({
   userId: z.number(),
   amount: z.number().nonnegative(),
   txHash: z.string().length(66)
})
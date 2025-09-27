import { Context } from "@/server/trpc";
import { create_tx_deposit_type, create_tx_msg_type, tx_id_type } from "@/server/types/tx.schema";
import { TRPCError } from "@trpc/server";

export const get_tx_list = async ({ ctx }: { ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
      const tx_list = await prisma.transaction.findMany({
         where: {
            to: Number(userId)
         }
      })

      if(!tx_list) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'tx not found' });
      }

      return {
         tx_list
      }
   } catch(e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}


export const get_tx_id = async ({ input, ctx }: { input: tx_id_type, ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
       const tx = await prisma.transaction.findFirst({
         where: {
            to: Number(userId),
            id: input.id
         }
       })

       if(!tx) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'tx not found' });
      }

      return {
         tx
      }
   } catch(e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

export const create_tx = async ({ ctx, tx_hash, amount, to }: { ctx: Context, tx_hash: string, amount: number, to: number }) => {

   try {
      return ""
   } catch(e) {
      return ""
   }
}

export const create_tx_msg = async ({ input, ctx }: { input: create_tx_msg_type, ctx: Context }) => {
   const { prisma } = ctx;
   try {
      const tx_id = await create_tx({ ctx, tx_hash: input.txHash, amount: input.amount, to: input.toUserId })
      if(!tx_id) {
         throw new TRPCError({ code: 'TIMEOUT', message: 'not able to create tx' });
      }
      const msg = await prisma.messages.create({
         data: {
            userId: input.toUserId,
            name: input.name,
            say: input.say,
            transactionId: tx_id
         }
      })    

      return {
         message: 'msg and tx created',
         msg_id: msg.id
      }
   } catch (e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }


}

export const create_tx_deposit = async ({ input, ctx }: { input: create_tx_deposit_type, ctx: Context }) => {
   const { prisma, userId } = ctx;
   try {
      const tx_id = await create_tx({ ctx, tx_hash: input.txHash, amount: input.amount, to: Number(userId) })
      
      if(!tx_id) {
         throw new TRPCError({ code: 'TIMEOUT', message: 'not able to create tx' });
      }

      const deposit = await prisma.deposit.create({
         data: {
            transactionId: tx_id,
            userId: Number(userId)
         }
      })

      return {
         message: 'tx and deposit created',
         deposit_id: tx_id
      }
   } catch (e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}
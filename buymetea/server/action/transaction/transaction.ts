import { Context } from "@/server/trpc";
import { create_tx_deposit_type, create_tx_msg_type, tx_id_type } from "@/server/types/tx.schema";
import { TRPCError } from "@trpc/server";
import { getAdd_TEA_TxDetails } from "./verify";

export const get_tx_list = async ({ ctx }: { ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
      const tx_list = await prisma.transaction.findMany({
         where: {
            to: Number(userId),
         },
         select: {
            id: true,
            amount: true,
            from: true,
            tokenName: true
         },
      });

      if(!tx_list) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'tx not found' });
      }

      return {
         tx_list
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
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
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

export const create_tx = async ({ ctx, input }: { ctx: Context, input: create_tx_msg_type, }) => {
   const { prisma } = ctx

   console.log('hi');
   
   try {
      console.log(input.txHash);
      
      const detail_tx = await getAdd_TEA_TxDetails(input.txHash);
   
      console.log(detail_tx);
      
      if(!detail_tx) {
         throw new TRPCError({ code: 'PAYMENT_REQUIRED', message: 'Not able to create transaction' });  
      }
   
   
   
   
      if(detail_tx.to !== input.to_address) {
         throw new TRPCError({ code: 'FORBIDDEN', message: 'Invalid recipient address' });  
      }
      
      if(detail_tx.amount !== input.amount) {
         throw new TRPCError({ code: 'BAD_REQUEST', message: 'Amount mismatch' });  
      }

      const tx = await prisma.transaction.create({
         data: {
            from: detail_tx.from,
            amount: input.amount,
            txHash: input.txHash,
            to: input.toUserId,
            tokenName: detail_tx.token
         }
      })
      console.log('3');
      return tx.id;
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'GATEWAY_TIMEOUT', message: 'fail to create tx' });
   }
}


export const create_tx_msg = async ({ input, ctx }: { input: create_tx_msg_type, ctx: Context }) => {
   const { prisma } = ctx;
   try {
      console.log(input.txHash);
      console.log(input.amount);
      const tx_id = await create_tx({ ctx, input })
      console.log(tx_id);
      
      
      const msg = await prisma.messages.create({
         data: {
            userId: input.toUserId,
            name: input.name,
            say: input.say,
            transactionId: tx_id
         }
      })    

      console.log(msg);
      

      return {
         message: 'msg and tx created',
         msg_id: msg.id
      }
   } catch (e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

// need to implement
export const deposit_tx = async ({ ctx, tx_hash, amount, to }: { ctx: Context, tx_hash: string, amount: number, to: number }) => {
   const { prisma } = ctx
   try {
      
      return ""
   } catch(e) {
      return ""
   }
}

export const create_tx_deposit = async ({ input, ctx }: { input: create_tx_deposit_type, ctx: Context }) => {
   const { prisma, userId } = ctx;
   try {
      // const tx_id = await create_tx({ ctx, input })
      
      // if(!tx_id) {
      //    throw new TRPCError({ code: 'TIMEOUT', message: 'not able to create tx' });
      // }

      const deposit = await prisma.deposit.create({
         data: {
            transactionId: "tx_id",
            userId: Number(userId)
         }
      })

      return {
         message: 'tx and deposit created',
         deposit_id: "tx_id"
      }
   } catch (e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}
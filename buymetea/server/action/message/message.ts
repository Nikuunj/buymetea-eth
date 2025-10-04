import { Context } from "@/server/trpc";
import { tx_id_type } from "@/server/types/tx.schema";
import { get_user_id_name_type } from "@/server/types/user.schema";
import { TRPCError } from "@trpc/server";

export const get_msg_list = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {
   const { prisma } = ctx;

   try {

      const user = await prisma.user.findFirst({
         where: {
            id: input.user_id,
            userName: input.user_name
         }
      })

      if(!user) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'use not found' });
      }

      const msg_list = await prisma.messages.findMany({
         where: {
            userId: user.id,
         },
         select: {
            name: true,
            say: true,
         },
         take: 5
      });


      if(!msg_list) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'msg not found' });
      }

      return {
         msg_list
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}


export const get_msg_list_dashboard = async ({ ctx }: { ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {

      const msg_list = await prisma.messages.findMany({
         where: {
            userId: Number(userId)
         },
         select: {
            name: true,
            say: true,
            id: true
         },
      });


      if(!msg_list) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'msg not found' });
      }

      return {
         msg_list
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

export const get_msg_id = async ({ ctx, input }: { input: tx_id_type, ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
       const msg = await prisma.messages.findFirst({
         where: {
            id: input.id,
            userId: Number(userId)
         }
       })

       if(!msg) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'msg not found' });
      }

      return {
         msg
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

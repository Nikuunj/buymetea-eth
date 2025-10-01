import { Context } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

export const deposit_list = async ({ ctx }: { ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
      const deposit_list = await prisma.deposit.findMany({
         where: {
            userId: Number(userId)
         }
      })

      if(!deposit_list) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'deposit not found' });
      }

      return {
         deposit_list
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

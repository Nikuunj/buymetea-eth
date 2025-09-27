import { Context } from "@/server/trpc"
import { get_user_id_name_type, user_profile_type } from "@/server/types/user.schema"
import { TRPCError } from "@trpc/server";

export const user_create_profile = async ({ ctx, input }: { input: user_profile_type, ctx: Context }) => {
   const { prisma, userId } = ctx;

   try {
      const profile = await prisma.userProfile.create({
         data: {
            userId: Number(userId),
            name: input.name,
            address: input.address,
            about: input.about,
            links: input.links
         }
      })
   } catch(e) {

   }
}

export const user_get_profile = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {
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

      const profile = await prisma.userProfile.findFirst({
         where: {
            userId: user.id
         }
      })

      
      if(!profile) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'use profile not found' });   
      }

      return {
         profile
      }
   } catch(e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}


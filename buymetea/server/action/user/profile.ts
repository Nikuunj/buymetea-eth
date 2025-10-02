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

      return {
         profile,
         message: 'profile is created'
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

export const user_get_profile = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {
   const { prisma } = ctx;

   try {
      const user = await prisma.user.findFirst({
         where: {
            OR: [
               { id: input.user_id },
               { userName: input.user_name }
            ]
         }
      })

      if(!user) {
         throw new TRPCError({ code: 'BAD_REQUEST', message: 'use not found' });
      }

      const profile = await prisma.userProfile.findFirst({
         where: {
            userId: user.id
         },
         select: {
            name: true,
            address: true,
            about: true,
            links: true
         }
      })

      
      if(!profile) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'use profile not found' });   
      }

      return {
         profile
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}

export const user_get_full_profile = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {
   const { prisma } = ctx
   try {
      const user = await prisma.user.findFirst({
         where: {
            OR: [
               { id: input.user_id },
               { userName: input.user_name }
            ]
         },
         select: {
            id: true,
            email: true,
            userName: true,
         },
      })

      if(!user) {
         throw new TRPCError({ code: 'BAD_REQUEST', message: 'use not found' });
      }

      const profile = await prisma.userProfile.findFirst({
         where: {
            userId: user.id
         },
         select: {
            name: true,
            address: true,
            about: true,
            links: true
         }
      })

      
      if(!profile) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'use profile not found' });   
      }

      return {
         ...user, ...profile
      }
   } catch(e) {
      if (e instanceof TRPCError) {
         throw e;
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}


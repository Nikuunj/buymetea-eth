import { JWT_SECRET } from '@/config/config';
import { Context } from '@/server/trpc'
import { user_create_type, user_login_type } from '@/server/types/user.schema'
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
 
export const user_create = async ({ ctx, input }: { input: user_create_type, ctx: Context }) => {
   const { prisma } = ctx;

   try {
      const hash_pass = bcrypt.hashSync(input.password, 10);
      const { id } =  await prisma.user.create({
         data: {
            email: input.email,
            userName: input.user_name,
            password: hash_pass
         }
      })

      return {
         message: 'user id created',
         user_id : id
      }
   } catch(e) {
      throw new TRPCError({ code: 'CONFLICT', message: 'use alredy exist' });
   }
}

export const user_login = async ({ ctx, input }: { input: user_login_type, ctx: Context }) => {
   const { prisma } = ctx;

   try {
      const user = await prisma.user.findFirst({
         where: {
            email: input.email_address
         }
      })

      if(!user) {
         throw new TRPCError({ code: 'NOT_FOUND', message: 'use not found' });
      }

      const match = bcrypt.compareSync(input.password, user.password);

      if(!match) {
         throw new TRPCError({ code: 'UNAUTHORIZED', message: 'use not found' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" })
      return {
         token: token,
         message: "use logged"
      }
   } catch(e) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unspecified error occurred' });
   }
}
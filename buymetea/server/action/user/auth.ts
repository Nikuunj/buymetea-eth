import { Context } from '@/server/trpc'
import { user_create_type, user_login_type } from '@/server/types/user.schema'
 
export const user_create = async ({ ctx, input }: { input: user_create_type, ctx: Context }) => {

}

export const user_login = async ({ ctx, input }: { input: user_login_type, ctx: Context }) => {

}
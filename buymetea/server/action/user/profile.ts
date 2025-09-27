import { Context } from "@/server/trpc"
import { get_user_id_name_type, user_profile_type } from "@/server/types/user.schema"

export const user_create_proile = async ({ ctx, input }: { input: user_profile_type, ctx: Context }) => {

}

export const user_get_proile = async ({ ctx, input }: { input: get_user_id_name_type, ctx: Context }) => {

}


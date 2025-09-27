import { z } from 'zod';

export const user_create_schema = z.object({ 
   email: z.string().email(), 
   address: z.string().length(42), 
   password: z.string().min(5) 
})

export const user_profile_schema = z.object({
   userId: z.number(),
   name: z.string().min(3),
   about: z.string().min(10),
   links: z.array(z.string().url())
});

export const user_login_schema = z.object({
   email_address: z.string(),
   password: z.string().min(5)
})

export const get_user_id_name_schema = z.object({
   user_id: z.number().optional(),
   user_name: z.string().optional(),
}).refine((data) => data.user_id !== undefined || data.user_name !== undefined, {
  message: "Either user_id or user_name is required",
});

// types
export type user_create_type  = z.infer<typeof user_create_schema>;
export type user_profile_type  = z.infer<typeof user_profile_schema>;
export type user_login_type  = z.infer<typeof user_login_schema>;
export type get_user_id_name_type  = z.infer<typeof get_user_id_name_schema>;
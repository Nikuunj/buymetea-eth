import { z } from 'zod';

export const user_schema = z.object({ 
   email: z.string().email(), 
   address: z.string().length(42), 
   password: z.string().min(5) 
})

export const user_profile = z.object({
   userId: z.number(),
   name: z.string().min(3),
   about: z.string().min(10),
   links: z.array(z.string().url())
});

export const user_login = z.object({
   email_address: z.string(),
   password: z.string().min(5)
})

export const get_user_profile = z.object({
   user_id: z.number().optional(),
   user_name: z.string().optional(),
}).refine((data) => data.user_id !== undefined || data.user_name !== undefined, {
  message: "Either user_id or user_name is required",
});
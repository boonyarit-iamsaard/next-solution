import { z } from 'zod';

export const authFormSchema = z.object({
  mode: z.enum(['login', 'register']).optional().default('login'),
  name: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  password: z.string().nonempty('Please enter a password'),
});

export const loginRequestSchema = authFormSchema.pick({
  email: true,
  password: true,
});

export const registerRequestSchema = authFormSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .extend({
    name: z.string().min(3, 'Please enter a name'),
  });

export type AuthForm = z.infer<typeof authFormSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

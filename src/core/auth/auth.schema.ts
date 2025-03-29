import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().nonempty('Please enter a password'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

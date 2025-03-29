import { z } from 'zod';

export const authFormSchema = z
  .object({
    mode: z.enum(['login', 'register']).optional().default('login'),
    name: z.string().optional(),
    email: z.string().email('Please enter a valid email'),
    password: z.string().nonempty('Please enter a password'),
  })
  .refine(
    (values) => {
      if (values.mode === 'register') {
        return z.string().trim().min(3).safeParse(values.name).success;
      }

      return true;
    },
    {
      path: ['name'],
      message: 'Please enter a name',
    },
  );
export type AuthRequest = z.infer<typeof authFormSchema>;

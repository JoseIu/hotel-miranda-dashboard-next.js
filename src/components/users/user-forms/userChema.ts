import { z } from 'zod';

export const USER_STATUS = ['Active', 'Inactive'] as const;
export const UserChema = z.object({
  name: z
    .string({ message: 'Name must be a string' })
    .min(3, { message: 'Name must be at least 3 characters long' })
    .min(1, { message: 'Name is required' }),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone is required' })
    .refine((number) => isNaN(Number(number)) === false, { message: 'Phone must be a number' }),
  status: z.boolean({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a boolean',
  }),

  jog_description: z.string().min(1, { message: 'Job description is required' }),
});

export type UserS = z.infer<typeof UserChema>;

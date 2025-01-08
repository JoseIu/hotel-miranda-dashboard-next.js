import { ROOM_TYPE } from '@/interfaces';
import { z } from 'zod';

export const ROOM_STATUS = ['AVAILABLE', 'BOOKED'] as const;

export const roomSchema = z.object({
  room_type: z.enum(ROOM_TYPE, { message: 'Select a valid room type' }),
  description: z
    .string({ message: 'Description must be a text' })
    .min(1, { message: 'Description is required' }),

  discount_percentage: z
    .string({ message: 'Discount must be a number' })
    .refine((value) => !isNaN(Number(value)), { message: 'Discount must be a number' }),
  price: z
    .string({ message: 'Price must be a number' })
    .refine((value) => !isNaN(Number(value)), { message: 'Discount must be a number' }),
  status: z.enum(ROOM_STATUS, { message: 'Select a valid status' }),
});

export type RoomSchema = z.infer<typeof roomSchema>;

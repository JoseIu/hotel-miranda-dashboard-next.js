import { ROOM_TYPE } from '@/interfaces';
import { z } from 'zod';

//TODO: move to interfaces
export const BOOKING_STATUS = ['CHECK_IN', 'CHECK_OUT', 'In_PROGRESS'] as const;

export const bookingShema = z.object({
  guest_name: z.string({ message: 'Name must be a text' }).min(1, { message: 'Name is required' }),
  guest_last_name: z
    .string({ message: 'Last name must be a text' })
    .min(1, { message: 'Last Name is required' }),
  order_date: z
    .string()
    .min(1, { message: 'Order Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),
  // .refine((date) => new Date(date) >= new Date(new Date().toDateString()), {
  //   message: 'The date cannot be in the past',
  // }),

  check_in: z
    .string()
    .min(1, { message: 'Checkin Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),
  check_out: z
    .string()
    .min(1, { message: 'Check Out is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),

  room_type: z.enum(ROOM_TYPE, { message: 'Select a valid room type' }),
  room_number: z.string({ message: 'Room ID is required' }),
  status: z.enum(BOOKING_STATUS, { message: 'Select a valid status' }),
  special_request: z
    .string({ message: 'Special request must be a text' })
    .min(1, { message: 'Special Request is required' })
    .optional(),
});

export type BookingSchema = z.infer<typeof bookingShema>;

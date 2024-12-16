import { ROOM_TYPE } from '@/interfaces';
import { z } from 'zod';

//name, lastName, orderDate, checkinDate, checkOut, roomType,status

//TODO: move to interfaces
const STATUS = ['Check In', 'Check Out', 'In Progress'] as const;

export const bookingShema = z.object({
  name: z.string({ message: 'Name must be a text' }).min(1, { message: 'Name is required' }),
  lastName: z.string({ message: 'Last name must be a text' }).min(1, { message: 'Last Name is required' }),
  orderDate: z
    .string()
    .min(1, { message: 'Order Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    })
    .refine((date) => new Date(date) >= new Date(new Date().toDateString()), {
      message: 'The date cannot be in the past',
    }),

  checkin: z
    .string()
    .min(1, { message: 'Checkin Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),
  checkOut: z
    .string()
    .min(1, { message: 'Check Out is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),

  roomType: z.enum(ROOM_TYPE),
  status: z.enum(STATUS),
  specialRequest: z
    .string({ message: 'Special request must be a text' })
    .min(1, { message: 'Special Request is required' }),
});

export type BookingSchema = z.infer<typeof bookingShema>;

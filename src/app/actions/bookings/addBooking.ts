'use server';

import { BookingToSend } from '@/interfaces';
import prisma from '@/lib/prisma';

type Props = {
  booking: BookingToSend;
};
export const addBooking = async ({ booking }: Props) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  try {
    const { order_date, check_in, check_out, guest_image, ...rest } = booking;
    const room = await prisma.room.findFirst({ where: { room_number: booking.room_number } });
    const data = await prisma.booking.create({
      data: {
        ...rest,
        order_date: new Date(order_date),
        check_in_date: new Date(check_in),
        check_out_date: new Date(check_out),
        room_number: booking.room_number,
        room_id: room!.id,
        guest_image: { create: { image: guest_image } },
      },
    });
    return {
      booking: data,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
      return {
        booking: null,
        error: true,
      };
    }
  }
};

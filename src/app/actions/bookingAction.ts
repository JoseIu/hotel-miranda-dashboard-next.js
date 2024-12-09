'use server';

import { BookingStatus } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        guest_image: {
          select: {
            image: true,
          },
        },
      },
    });

    const bookingsFormatted = bookings.map((booking) => {
      const { order_date, check_in_date, check_out_date, guest_image, status, ...rest } = booking;

      return {
        ...rest,
        check_in: check_in_date.toISOString(),
        check_out: check_out_date.toISOString(),
        order_date: order_date.toISOString(),
        guest_image: guest_image!.image,
        status: status as BookingStatus,
      };
    });

    return {
      bookings: bookingsFormatted,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        bookings: [],
        error: true,
      };
    }
  }
};

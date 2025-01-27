'use server';

import { BookingStatus } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getBookingInfo = async (id: string) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
      include: {
        guest_image: true,
      },
    });

    if (!booking) throw new Error('Booking not found');

    const { order_date, check_in_date, check_out_date, guest_image, status, ...rest } = booking;
    const bookingsFormatted = {
      ...rest,
      check_in: check_in_date.toISOString(),
      check_out: check_out_date.toISOString(),
      order_date: order_date.toISOString(),
      guest_image: guest_image!.image,
      status: status as BookingStatus,
    };

    const room = await prisma.room.findUnique({
      where: {
        id: booking.room_id,
      },
      include: {
        room_images: true,
      },
    });
    if (!room) throw new Error('Room not found');
    const { room_images, ...roomRest } = room;
    const roomsFormatted = {
      ...roomRest,
      images: room_images.map((image) => image.image),
    };
    return {
      booking: bookingsFormatted,
      room: roomsFormatted,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        booking: null,
        room: null,
        error: true,
      };
    }
  }
};

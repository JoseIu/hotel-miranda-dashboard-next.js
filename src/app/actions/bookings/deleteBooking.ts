'use server';

import prisma from '@/lib/prisma';

export const deleteBooking = async (bookingId: string) => {
  if (!bookingId) return;
  try {
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return {
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
      };
    }
  }
};

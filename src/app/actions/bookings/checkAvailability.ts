'use server';

import { RoomType } from '@/interfaces/roomResp';
import prisma from '@/lib/prisma';

export const checkAvailability = async (start: string, end: string, room_type: RoomType) => {
  try {
    console.log({ start, end, room_type });
    const startDate = new Date(start).toISOString();
    const endDate = new Date(end).toISOString();
    const availableRooms = await prisma.room.findMany({
      where: {
        room_type: room_type,
        status: 'AVAILABLE',
        bookings: {
          none: {
            OR: [
              { check_in_date: { lte: endDate }, check_out_date: { gte: startDate } },
              { check_in_date: { gte: endDate }, check_out_date: { lte: startDate } },
            ],
            status: { not: 'CHECK_OUT' },
          },
        },
      },
    });

    return availableRooms;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }
};

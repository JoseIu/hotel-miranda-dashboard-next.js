'use server';

import { RoomType } from '@/interfaces/roomResp';
import prisma from '@/lib/prisma';

export const checkAvailability = async (start: string, end: string, room_type: RoomType) => {
  try {
    console.log({ start, end, room_type });
    const startDate = new Date(start);
    startDate.setUTCHours(10, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setUTCHours(9, 0, 0, 0);

    const availableRooms = await prisma.room.findMany({
      where: {
        room_type: room_type,
        bookings: {
          none: {
            check_in_date: { lte: endDate },
            check_out_date: { gte: startDate },
          },
        },
      },
    });

    const availableRoomsFormatted = availableRooms.map((room) => {
      return {
        id: room.id,
        room_number: room.room_number,
        room_type: room.room_type,
      };
    });

    return {
      availableRooms: availableRoomsFormatted,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        availableRooms: [],
        error: true,
      };
    }
  }
};

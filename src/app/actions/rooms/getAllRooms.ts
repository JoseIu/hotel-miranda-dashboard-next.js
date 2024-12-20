'use server';

import prisma from '@/lib/prisma';

export const getAllRooms = async () => {
  try {
    const resp = await prisma.room.findMany({
      include: {
        room_images: true,
      },
    });

    const roomsFormatted = resp.map((room) => {
      const { room_images, ...rest } = room;

      return {
        ...rest,
        images: room_images.map((image) => image.image),
      };
    });

    return {
      rooms: roomsFormatted,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        rooms: [],
      };
    }
  }
};

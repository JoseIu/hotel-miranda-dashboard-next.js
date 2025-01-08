'use server';

import { CreateRoom } from '@/interfaces';
import prisma from '@/lib/prisma';

export const createRoom = async (room: CreateRoom) => {
  try {
    const { room_images, ...roomData } = room;
    const newRoom = await prisma.room.create({
      data: {
        ...roomData,
        room_images: {
          create: room_images.map((image) => ({ image })),
        },
      },
    });

    return {
      room: newRoom,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        room: null,
        error: true,
      };
    }
  }
};

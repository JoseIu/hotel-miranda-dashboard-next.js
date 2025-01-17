'use server';

import prisma from '@/lib/prisma';

export const deleteRoom = async (roomId: string) => {
  if (!roomId) return;

  try {
    await prisma.room.delete({
      where: {
        id: roomId,
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

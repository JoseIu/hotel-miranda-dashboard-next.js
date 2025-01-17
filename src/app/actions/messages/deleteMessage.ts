'use server';

import prisma from '@/lib/prisma';

export const deleteMessage = async (messageId: string) => {
  if (!messageId) return;
  try {
    await prisma.message.delete({
      where: {
        id: messageId,
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

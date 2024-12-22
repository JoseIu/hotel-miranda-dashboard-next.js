'use server';

import { Message } from '@/interfaces/message';
import prisma from '@/lib/prisma';

export const getAllMessages = async (): Promise<Message[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const messages = await prisma.message.findMany();

    return messages;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
    return [];
  }
};

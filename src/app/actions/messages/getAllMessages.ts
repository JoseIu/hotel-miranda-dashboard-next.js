'use server';

import { Message } from '@/interfaces/message';
import prisma from '@/lib/prisma';
type Props = {
  page?: number;
  take?: number;
};

export const getAllMessages = async ({ page = 1, take = 7 }: Props = {}): Promise<Message[]> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  console.log(page);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const messages = await prisma.message.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    return messages;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
    return [];
  }
};

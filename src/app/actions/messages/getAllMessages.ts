'use server';

import prisma from '@/lib/prisma';
type Props = {
  page?: number;
  take?: number;
};

export const getAllMessages = async ({ page = 1, take = 7 }: Props = {}) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const messages = await prisma.message.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.message.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      messages: messages,
      error: false,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        messages: [],
        error: false,
        currentPage: page,
        totalPages: 0,
      };
    }
    return {
      messages: [],
      error: false,
      currentPage: page,
      totalPages: 0,
    };
  }
};

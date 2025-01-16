'use server';
import prisma from '@/lib/prisma';

type Props = {
  page?: number;
  take?: number;
  search?: string;
  status?: string;
};

export const getUsers = async ({ page = 1, take = 10, search, status }: Props) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const users = await prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.user.count({
      where: {
        name: {
          contains: search,
        },
        ...(status !== '' && {
          status: status === 'active',
        }),
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      users: users,
      error: false,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        users: [],
        error: false,
      };
    }
    return {
      users: [],
      error: false,
    };
  }
};

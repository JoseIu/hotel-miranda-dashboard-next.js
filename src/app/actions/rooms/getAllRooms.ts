'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

type Props = {
  page?: number;
  take?: number;
  filter: string;
};

export const getAllRooms = async ({ page = 1, take = 15, filter }: Props) => {
  console.log(filter);
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const resp = await prisma.room.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        room_images: true,
      },
      orderBy: getRoomOrderType(filter),
    });

    const roomsFormatted = resp.map((room) => {
      const { room_images, ...rest } = room;

      return {
        ...rest,
        images: room_images.map((image) => image.image),
      };
    });

    const toalCount = await prisma.room.count();
    const totalPages = Math.ceil(toalCount / take);

    return {
      rooms: roomsFormatted,
      currentPage: page,
      totalPages,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        rooms: [],
        currentPage: page,
        totalPages: 0,
        error: true,
      };
    } else {
      return {
        rooms: [],
        currentPage: page,
        totalPages: 0,

        error: true,
      };
    }
  }
};

const getRoomOrderType = (status: string) => {
  switch (status) {
    case 'status':
      return {
        status: Prisma.SortOrder.asc,
      };
    case 'price':
      return {
        price: Prisma.SortOrder.desc,
      };
    default:
      return {};
  }
};

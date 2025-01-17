'use server';

import { BookingStatus } from '@/interfaces';
import prisma from '@/lib/prisma';
import { getOrderBy, sortBookings } from '@/utils/sortBookings';
type Props = {
  page?: number;
  take?: number;
  search?: string;
  status?: BookingStatus;
  orderBy?: string;
};

export const getBookings = async ({ page = 1, take = 10, search, status, orderBy = 'order-date' }: Props) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const bookings = await prisma.booking.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        guest_name: {
          contains: search,
        },
        status: {
          equals: status,
        },
      },
      orderBy: getOrderBy(orderBy),
      include: {
        guest_image: {
          select: {
            image: true,
          },
        },
      },
    });

    const bookingsFormatted = bookings.map((booking) => {
      const { order_date, check_in_date, check_out_date, guest_image, status, ...rest } = booking;

      return {
        ...rest,
        check_in: check_in_date.toISOString(),
        check_out: check_out_date.toISOString(),
        order_date: order_date.toISOString(),
        guest_image: guest_image!.image,
        status: status as BookingStatus,
      };
    });
    const totalCount = await prisma.booking.count({
      where: {
        guest_name: {
          contains: search,
        },
        status: {
          equals: status,
        },
      },
      orderBy: getOrderBy(orderBy),
    });
    const totalPages = Math.ceil(totalCount / take);

    if (orderBy === 'CHECK_IN' || orderBy === 'CHECK_OUT') {
      const bookingsSortered = sortBookings(bookingsFormatted, orderBy);
      return {
        bookings: bookingsSortered,
        error: false,
        currentPage: page,
        totalPages,
      };
    }

    return {
      bookings: bookingsFormatted,
      error: false,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        bookings: [],
        error: true,
        currentPage: page,
        totalPages: 1,
      };
    }
    return {
      bookings: [],
      error: true,
      currentPage: page,
      totalPages: 1,
    };
  }
};

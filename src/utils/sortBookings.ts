import { Booking, BookingStatus } from '@/interfaces';
import { Prisma } from '@prisma/client';

//SORT BOOKINGS IF CHECK IN OR CHECK OUT
export const sortBookings = (bookings: Booking[], orderBy: BookingStatus) => {
  const bookingsToSort = [...bookings];
  switch (orderBy) {
    case 'CHECK_IN':
      return bookingsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === 'CHECK_IN') return -1;
        if (a.status === 'CHECK_OUT' && b.status === 'In_PROGRESS') return -1;
        return 0;
      });
    case 'CHECK_OUT':
      return bookingsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === 'CHECK_OUT') return -1;
        if (a.status === 'CHECK_IN' && b.status === 'In_PROGRESS') return -1;
        return 0;
      });
    default:
      return bookingsToSort;
  }
};
//For PRIMS SQL
export const getOrderBy = (sortBy: string) => {
  switch (sortBy) {
    case 'guest':
      return { guest_name: Prisma.SortOrder.asc };
    case 'order-date':
      return { order_date: Prisma.SortOrder.desc };
    default:
      return { order_date: Prisma.SortOrder.desc };
  }
};

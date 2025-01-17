import { getBookings } from '@/app/actions/bookingAction';
import { BookingStatus } from '@/interfaces';
import { Pagination } from '../../pagination/Pagination';
import { BookingsTable } from '../bookings-table/BookingsTable';

type Props = {
  search?: string;
  status?: BookingStatus;
  orderBy?: string;
  page?: number;
};

export const BookingContent = async ({ search, status, orderBy, page }: Props) => {
  const { bookings, totalPages } = await getBookings({ search, status, orderBy, page });

  return (
    <>
      <BookingsTable bookings={bookings} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

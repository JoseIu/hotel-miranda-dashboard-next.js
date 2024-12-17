import { getBookings } from '@/app/actions/bookingAction';
import { BookingStatus } from '@/interfaces';
import { BookingsTable } from '../bookings-table/BookingsTable';

type Props = {
  search?: string;
  status?: BookingStatus;
  orderBy?: string;
};

export const BookingContent = async ({ search, status, orderBy }: Props) => {
  const result = await getBookings({ search, status, orderBy });
  const bookings = result?.bookings ?? [];
  return <BookingsTable bookings={bookings} />;
};

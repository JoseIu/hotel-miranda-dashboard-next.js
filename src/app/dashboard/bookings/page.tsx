import { getBookings } from '@/app/actions/bookingAction';
import { BookingsTable } from '@/components';
import Link from 'next/link';

const BookingsPage = async () => {
  const result = await getBookings();
  const bookings = result?.bookings ?? [];

  return (
    <div>
      BookingsPage
      <Link href={`/dashboard/bookings/id`}>New Booking</Link>
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;

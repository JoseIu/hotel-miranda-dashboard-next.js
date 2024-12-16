import { getBookings } from '@/app/actions/bookingAction';
import { BookingsTable } from '@/components';
import Link from 'next/link';
import './bookingsPage.scss';

const BookingsPage = async () => {
  const result = await getBookings();
  const bookings = result?.bookings ?? [];

  return (
    <div className="sections">
      BookingsPage
      <Link href={`/bookings/new`}>New Booking</Link>
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;

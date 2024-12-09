import { getBookings } from '@/app/actions/bookingAction';
import { BookingsTable } from '@/components';

const BookingsPage = async () => {
  const result = await getBookings();
  const bookings = result?.bookings ?? [];

  console.log(bookings);

  return (
    <div>
      BookingsPage
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;

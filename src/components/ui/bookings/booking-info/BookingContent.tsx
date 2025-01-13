import { getBookingInfo } from '@/app/actions/bookings/getBookingInfo';
import { BookingInfo } from './BookingInfo';

type Props = {
  bookingId: string;
};
export const BookingContent = async ({ bookingId }: Props) => {
  const bookingInfo = await getBookingInfo(bookingId);
  if (!bookingInfo?.booking || !bookingInfo.room) return <div>Error with something</div>;
  return <BookingInfo booking={bookingInfo.booking} room={bookingInfo.room} />;
};

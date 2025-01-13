import { BookingContent } from '@/components/ui/bookings/booking-info/BookingContent';
import { GoBack } from '@/components/ui/go-back/GoBack';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const BookingInfoPage = async ({ params }: Props) => {
  const bookingId = (await params).id;

  return (
    <section>
      <GoBack />

      <Suspense fallback={<div>Loading...</div>}>
        <BookingContent bookingId={bookingId} />
      </Suspense>
    </section>
  );
};

export default BookingInfoPage;

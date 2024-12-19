'use client';
import { EditBookingForm } from '@/components/ui/bookings/new-booking-from/EditBookingForm';
import { GoBack } from '@/components/ui/go-back/GoBack';
import { useBookingStore } from '@/store/booking/bookingStore';
import { use } from 'react';

type Props = {
  params: Promise<{ id?: string }>;
};

const BookingFormPage = ({ params }: Props) => {
  const { id } = use(params);

  const bookings = useBookingStore((state) => state.bookings);

  const bookingToEdit = bookings.find((booking) => booking.id === id);

  return (
    <div className="section-form">
      <GoBack />
      <EditBookingForm booking={bookingToEdit} />
    </div>
  );
};

export default BookingFormPage;

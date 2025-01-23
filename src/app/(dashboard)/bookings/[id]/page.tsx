'use client';
import { EditBookingForm } from '@/components/ui/bookings/new-booking-from/EditBookingForm';
import { GoBack } from '@/components/ui/go-back/GoBack';
import { useBookingStore } from '@/store/booking/bookingStore';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Props = {
  params: Promise<{ id?: string }>;
};

const BookingFormPage = ({ params }: Props) => {
  const { id } = use(params);

  const bookings = useBookingStore((state) => state.bookings);

  const bookingToEdit = bookings.find((booking) => booking.id === id);
  if (!bookingToEdit) return notFound();

  return (
    <div className="section-form">
      <GoBack />
      <EditBookingForm booking={bookingToEdit} />
    </div>
  );
};

export default BookingFormPage;

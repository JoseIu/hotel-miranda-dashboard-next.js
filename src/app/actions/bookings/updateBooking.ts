'use server';

import { BookingToEdit } from '@/interfaces';
import prisma from '@/lib/prisma';

export const updateBooking = async (booking_id: string, booking: Partial<BookingToEdit>) => {
  try {
    const currentBooking = await prisma.booking.findUnique({
      where: { id: booking_id },
      include: { guest_image: true },
    });
    if (!currentBooking) {
      throw new Error('Booking not found');
    }
    console.log({ currentBooking });

    const bookingFormatged: BookingToEdit = {
      guest_name: currentBooking.guest_name,
      guest_last_name: currentBooking.guest_last_name,
      order_date: currentBooking.order_date,
      check_in: currentBooking.check_in_date,
      check_out: currentBooking.check_out_date,
      room_type: currentBooking.room_type,
      room_number: currentBooking.room_number,
      special_request: currentBooking.special_request,
      status: currentBooking.status,
    };

    const changedEntries = getEntriesChanged(bookingFormatged, booking);

    console.log({ changedEntries });
  } catch (error) {
    console.log(error);
  }
};

//TODO: Implemente edit booking
const getEntriesChanged = (current: BookingToEdit, updated: Partial<BookingToEdit>) => {
  const entries = Object.entries(updated);

  const changedEntries = entries.filter(([key, value]) => {
    const currentValue = current[key as keyof BookingToEdit];

    if (typeof currentValue === 'string' && typeof value === 'string') {
      return currentValue.trim() !== value.trim();
    }

    if (currentValue instanceof Date || typeof currentValue === 'string') {
      const currentDate = new Date(currentValue).getTime();
      const updatedDate = new Date(value as string | Date).getTime();
      return currentDate !== updatedDate;
    }

    return currentValue !== value;
  });

  return changedEntries.map(([key, value]) => ({
    field: key,
    newValue: value,
  }));
};

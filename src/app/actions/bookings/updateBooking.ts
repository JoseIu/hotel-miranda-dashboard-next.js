'use server';

import { BookingToEdit } from '@/interfaces';
import prisma from '@/lib/prisma';

export const updateBooking = async (booking_id: string, booking: Partial<BookingToEdit>) => {
  try {
    const currentBooking = await prisma.booking.findUnique({
      where: { id: booking_id },
    });
    if (!currentBooking) {
      throw new Error('Booking not found');
    }

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

    if (!changedEntries.length) throw new Error('No changes');
    await prisma.booking.update({
      where: { id: booking_id },
      data: Object.fromEntries(changedEntries.map(({ field, newValue }) => [field, newValue])),
    });

    return {
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
      };
    }
  }
};

interface EntriesChanged {
  field: string;
  newValue: string | number | Date | null;
}

const getEntriesChanged = (current: BookingToEdit, updated: Partial<BookingToEdit>): EntriesChanged[] => {
  return Object.entries(updated)
    .filter(([key, newValue]) => {
      const currentValue = current[key as keyof BookingToEdit];

      if (currentValue instanceof Date || newValue instanceof Date) {
        return new Date(currentValue!).getTime() !== new Date(newValue!).getTime();
      }

      if (typeof currentValue === 'string' && typeof newValue === 'string') {
        return currentValue.trim() !== newValue.trim();
      }
      return currentValue !== newValue;
    })
    .map(([key, newValue]) => ({
      field: key,
      newValue,
    }));
};

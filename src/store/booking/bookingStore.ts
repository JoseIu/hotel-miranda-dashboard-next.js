import { Booking } from '@/interfaces';
import { create } from 'zustand';

interface State {
  bookings: Booking[];
  //   getBooking: (id: string) => Booking;
  addBookings: (booking: Booking[]) => void;
}

export const useBookingStore = create<State>()((set) => ({
  bookings: [],
  addBookings: (booking: Booking[]) => set({ bookings: booking }),
}));

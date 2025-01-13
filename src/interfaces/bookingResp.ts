import { Room, RoomType } from './roomResp';

export interface BookingResp {
  bookings: Booking[];
  error: boolean;
}

export interface Booking {
  id: string;
  guest_name: string;
  guest_last_name: string;
  special_request: string | null;
  guest_image: string;
  room_type: RoomType;
  room_number: number;
  order_date: string;
  check_in: string;
  check_out: string;
  room_id: string;
  status: BookingStatus;
}

export interface BookingToSend {
  guest_name: string;
  guest_last_name: string;
  special_request: string | null;
  guest_image: string;
  room_type: RoomType;
  // room_id: string;
  room_number: number;
  order_date: string;
  check_in: string;
  check_out: string;
  status: BookingStatus;
}
export interface BookingToEdit {
  guest_name: string;
  guest_last_name: string;
  special_request: string | null;
  // guest_image: string;
  room_type: RoomType;
  // room_id: string;
  room_number: number;
  order_date: Date;
  check_in: Date;
  check_out: Date;
  status: BookingStatus;
}

export type BookingStatus = 'In_PROGRESS' | 'CHECK_IN' | 'CHECK_OUT';

export interface BookingInfo {
  booking: Booking;
  room: Room;
}

import { RoomType } from './roomResp';

export interface BookingResp {
  bookings: Booking[];
  error: boolean;
}

export interface Booking {
  id: string;
  guest_name: string;
  special_request: string | null;
  guest_image: string;
  room_type: RoomType;
  order_date: string;
  check_in: string;
  check_out: string;
  room_id: string;
  status: BookingStatus;
}

export type BookingStatus = 'In_PROGRESS' | 'CHECK_IN' | 'CHECK_OUT';

export interface Room {
  id: string;
  created_at: Date;
  discount_percentage: number;
  images: string[];
  offer: boolean;
  price: number;
  room_number: number;
  room_type: string;
  status: RoomStatus;
  description: string;
}
export type RoomStatus = 'AVAILABLE' | 'BOOKED';

export const ROOM_TYPE = ['SINGLE_BED', 'DOUBLE_BED', 'DOUBLE_SUPERIOR', 'SUITE'] as const;
export type RoomType = (typeof ROOM_TYPE)[number];

// export type RoomType = 'SINGLE_BED' | 'DOUBLE_BED' | 'DOUBLE_SUPERIOR' | 'SUITE';

export interface RoomAvailability {
  id: string;
  room_type: RoomType;
  room_number: number;
}

export interface CreateRoom {
  room_number: number;
  room_type: RoomType;
  description: string;
  price: number;
  discount_percentage: number;
  offer: boolean;
  status: RoomStatus;
  room_images: string[];
}

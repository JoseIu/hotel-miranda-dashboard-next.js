import { faker } from '@faker-js/faker';
type RoomType = 'SINGLE_BED' | 'DOUBLE_BED' | 'DOUBLE_SUPERIOR' | 'SUITE';

type RoomStatus = 'AVAILABLE' | 'BOOKED';

interface Room {
  room_number: number;
  room_type: RoomType;
  description: string;
  price: number;
  discount_percentage: number;
  offer: boolean;
  status: RoomStatus;
  room_imagess: string[];
}

type BookingStatus = 'In_PROGRESS' | 'CHECK_IN' | 'CHECK_OUT';

interface Booking {
  guest_name: string;
  order_date: Date;
  check_in_date: Date;
  check_out_date: Date;
  special_request: string;
  status: BookingStatus;
  guest_image: string;
}

interface SeedData {
  rooms: Room[];
  bookings: Booking[];
}

const bookings = (): Booking[] => {
  const bookings: Booking[] = [];

  for (let i = 0; i < 10; i++) {
    const booking: Booking = {
      guest_name: faker.person.firstName(),
      order_date: faker.date.recent(),
      check_in_date: faker.date.future(),
      check_out_date: faker.date.future(),
      special_request: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['In_PROGRESS', 'CHECK_IN', 'CHECK_OUT']),
      guest_image: faker.image.avatar(),
    };

    bookings.push(booking);
  }

  return bookings;
};

const rooms = (): Room[] => {
  const rooms: Room[] = [];

  for (let i = 0; i < 10; i++) {
    const room: Room = {
      room_number: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
      room_type: faker.helpers.arrayElement(['SINGLE_BED', 'DOUBLE_BED', 'DOUBLE_SUPERIOR', 'SUITE']),
      description: faker.lorem.sentence(),
      price: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
      discount_percentage: faker.helpers.rangeToNumber({ min: 0, max: 50 }),
      offer: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(['BOOKED']),
      room_imagess: ['room1.webp', 'room2.webp', 'room3.webp'],
    };

    rooms.push(room);
  }
  for (let i = 0; i < 10; i++) {
    const room: Room = {
      room_number: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
      room_type: faker.helpers.arrayElement(['SINGLE_BED', 'DOUBLE_BED', 'DOUBLE_SUPERIOR', 'SUITE']),
      description: faker.lorem.sentence(),
      price: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
      discount_percentage: faker.helpers.rangeToNumber({ min: 0, max: 50 }),
      offer: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(['AVAILABLE']),
      room_imagess: ['room1.webp', 'room2.webp', 'room3.webp'],
    };

    rooms.push(room);
  }

  return rooms;
};

export const seedData: SeedData = {
  bookings: bookings(),
  rooms: rooms(),
};

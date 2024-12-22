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
  guest_last_name: string;
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
const getCheckinDate = () => {
  const futureDate = new Date(faker.date.future());
  futureDate.setUTCHours(10, 0, 0, 0);
  return futureDate;
};
const getCheckOutDate = (checkInDate: Date): Date => {
  const daysToAdd = faker.number.int({ min: 1, max: 7 });
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + daysToAdd);
  checkOutDate.setUTCHours(9, 0, 0, 0);
  return checkOutDate;
};
const bookings = (): Booking[] => {
  const bookings: Booking[] = [];

  for (let i = 0; i < 10; i++) {
    const checkInDate = getCheckinDate();
    const booking: Booking = {
      guest_name: faker.person.firstName(),
      guest_last_name: faker.person.lastName(),
      order_date: faker.date.recent(),
      check_in_date: checkInDate,

      check_out_date: getCheckOutDate(checkInDate),
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
interface MeesageSeed {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date: Date;
  subject: string;
  message: string;
  archived: boolean;
}

const generateMessageSeed = (): MeesageSeed[] => {
  const messageData: MeesageSeed[] = [];

  for (let i = 0; i < 10; i++) {
    const message: MeesageSeed = {
      customer_name: faker.person.firstName(),
      customer_email: faker.internet.email(),
      customer_phone: faker.phone.number(),
      date: faker.date.recent(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraph(),
      archived: faker.datatype.boolean(),
    };

    messageData.push(message);
  }
  return messageData;
};
export const messageData: MeesageSeed[] = generateMessageSeed();

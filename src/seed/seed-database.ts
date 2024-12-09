import prisma from '../lib/prisma';
import { seedData } from './seed';

const main = async () => {
  await Promise.all([await prisma.booking.deleteMany(), await prisma.room.deleteMany()]);

  const { rooms, bookings } = seedData;

  for (const room of rooms) {
    const { room_imagess, ...roomData } = room;
    await prisma.room.create({
      data: {
        ...roomData,
        room_images: {
          create: room_imagess.map((image) => ({ image })),
        },
      },
    });
  }

  const roomIds = await prisma.room.findMany({ select: { id: true } });

  for (const [index, booking] of bookings.entries()) {
    const { guest_image, ...bookingData } = booking;

    const roomId = roomIds[index].id;

    await prisma.booking.create({
      data: {
        ...bookingData,
        room_id: roomId,

        guest_image: { create: { image: guest_image } },
      },
    });
  }

  console.log('SEED EJECUTADO CORRECTAMENTE!! 🚀🚀🚀🚀🚀');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

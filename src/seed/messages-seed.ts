import prisma from '../lib/prisma';
import { messageData } from './seed';

const main = async () => {
  await prisma.message.deleteMany();

  await prisma.message.createMany({
    data: messageData,
  });
  console.log('SEED EJECUTADO CORRECTAMENTE!! 🚀🚀🚀🚀🚀');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

import { faker } from '@faker-js/faker';
import prisma from '../lib/prisma';

interface UserSeed {
  name: string;
  email: string;
  phone: string;
  status: boolean;
  jog_description: string;
  user_image: string;
}

const getUsersSeed = (): UserSeed[] => {
  const userSeed: UserSeed[] = [];

  for (let index = 0; index < 20; index++) {
    const user: UserSeed = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      status: faker.datatype.boolean(),
      jog_description: faker.lorem.sentence(),
      user_image: faker.image.avatar(),
    };

    userSeed.push(user);
  }

  return userSeed;
};
const usersSeed: UserSeed[] = getUsersSeed();

const main = async () => {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: usersSeed,
  });

  console.log('SEED USERS EJECUTADO CORRECTAMENTE!! 🚀🚀🚀🚀🚀');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

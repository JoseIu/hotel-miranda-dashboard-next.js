import { faker } from '@faker-js/faker';

import bcryptjs from 'bcryptjs';
import prisma from '../lib/prisma';

interface AdminUserSeed {
  role: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

const main = async () => {
  const userToSeed: AdminUserSeed = {
    role: 'admin',
    name: 'Joselu',
    email: 'joselu@goole.com',
    password: bcryptjs.hashSync('123456'),
    image: faker.image.avatar(),
  };

  await prisma.userAdmin.deleteMany();
  await prisma.userAdmin.create({
    data: userToSeed,
  });

  console.log('User Admin seeded 🚀🚀🚀🚀🚀');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

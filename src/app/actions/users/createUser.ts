'use server';

import { NewUser } from '@/interfaces/user';
import prisma from '@/lib/prisma';

export const createUser = async (user: NewUser) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    if (!newUser) throw new Error('User not created');

    return {
      user,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        user: null,
        error: true,
      };
    }
  }
};

export const deleteUser = async (id: string) => {
  if (!id) return;

  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id,
      },
    });

    console.log(userDeleted);

    return {
      user: userDeleted,
      error: false,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        user: null,
        error: true,
      };
    }
  }
};

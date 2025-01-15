'use server';

import { NewUser } from '@/interfaces/user';
import prisma from '@/lib/prisma';

export const updateUser = async (userId: string, user: Partial<NewUser>) => {
  try {
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        jog_description: user.jog_description,
        // user_image: user.user_image,
      },
    });

    return {
      user: userUpdated,
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

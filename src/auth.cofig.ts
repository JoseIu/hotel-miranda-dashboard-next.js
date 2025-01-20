import bcryptjs from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';

const authenticatedRoutes = ['/', 'bookings', 'rooms', 'contact', 'users'];

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoogedIn = !!auth?.user;
      const isOnDashboard = authenticatedRoutes.some((route) => nextUrl.pathname.startsWith(route));

      if (isOnDashboard) {
        if (isLoogedIn) return true;
        return false;
      } else if (isLoogedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },

      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //search eamil
        const user = await prisma.userAdmin.findUnique({ where: { email } });
        if (!user) return null;

        //check if the password is correct
        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

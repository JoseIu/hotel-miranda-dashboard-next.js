import NextAuth from 'next-auth';
import { authConfig } from './auth.cofig';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});

'use client';
import { SignOutIcon } from '@primer/octicons-react';
import { signOut } from 'next-auth/react';

export const HeaderLogOut = () => {
  return (
    <button className="log-out" onClick={() => signOut()}>
      <SignOutIcon size={24} />
    </button>
  );
};

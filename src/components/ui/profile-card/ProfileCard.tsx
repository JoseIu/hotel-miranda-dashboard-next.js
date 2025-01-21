'use client';

import { useSession } from 'next-auth/react';
import './profileCard.scss';

export const ProfileCard = () => {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <article className="profile-card">
      {session.user?.image && (
        <img className="profile-card__img" src={session.user.image} alt={session.user.name!} />
      )}
      <h2 className="profile-card__name">{session?.user?.name}</h2>
    </article>
  );
};

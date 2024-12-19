'use client';
import { UndoIcon } from '@primer/octicons-react';
import { useRouter } from 'next/navigation';
import './goBack.scss';

export const GoBack = () => {
  const route = useRouter();

  return (
    <button className="go-back" onClick={() => route.back()} aria-label="button to go back">
      <UndoIcon className="go-back__icon" size={40} />
      Go back
    </button>
  );
};

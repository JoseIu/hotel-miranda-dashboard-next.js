'use client';

import { ArrowLeftIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useEffect } from 'react';
import './notFound.scss';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="not-found">
      <h2 className="not-found__title">Outch!</h2>
      <div className="not-found__error">
        <span className="not-found__code">500</span>
      </div>
      <span className="not-found__text">Something go wrong </span>
      <Link className="not-found__btn" href="/">
        <ArrowLeftIcon className="not-found__arrow" size={20} />
        Go to dashBoard
      </Link>
    </div>
  );
}

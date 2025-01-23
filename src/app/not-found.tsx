import { ArrowLeftIcon } from '@primer/octicons-react';
import Link from 'next/link';
import './notFound.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">Outch!</h2>
      <div className="not-found__error">
        <span className="not-found__code">404</span>
      </div>
      <span className="not-found__text">Not Found</span>
      <Link className="not-found__btn" href="/">
        <ArrowLeftIcon className="not-found__arrow" size={20} />
        Go to dashBoard
      </Link>
    </div>
  );
};

export default NotFoundPage;

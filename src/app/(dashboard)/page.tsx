import { CarouselContent } from '@/components/dashboard/carousel-content/CarouselContent';
import { MessageSkeleton } from '@/components/ui/message-skleton/MessageSkeleton';
import { BookmarkIcon, CalendarIcon, SignInIcon, SignOutIcon } from '@primer/octicons-react';
import { Metadata } from 'next';
import { Suspense } from 'react';
import './dashboard.scss';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard to manage hotel reservations',
};

const DashBoardPage = () => {
  return (
    <section className="dashboard">
      <div className="stats">
        <article className="stat">
          <BookmarkIcon className="stat__icon" size={24} />
          <div className="stat__content">
            <span className="stat__number">150</span>
            <h2 className="stat__title">Reservations Received</h2>
          </div>
        </article>
        <article className="stat">
          <CalendarIcon className="stat__icon" size={24} />
          <div className="stat__content">
            <span className="stat__number">50</span>
            <h2 className="stat__title">Occupation</h2>
          </div>
        </article>
        <article className="stat">
          <SignOutIcon className="stat__icon" size={24} />
          <div className="stat__content">
            <span className="stat__number">80</span>
            <h2 className="stat__title">Check-ins</h2>
          </div>
        </article>
        <article className="stat">
          <SignInIcon className="stat__icon" size={24} />
          <div className="stat__content">
            <span className="stat__number">70</span>
            <h2 className="stat__title">Check-outs</h2>
          </div>
        </article>
      </div>
      <Suspense fallback={<MessageSkeleton />}>
        <CarouselContent />
      </Suspense>
    </section>
  );
};

export default DashBoardPage;

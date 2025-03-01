import { BookingContent } from '@/components/ui/bookings/booking-content/BookingContent';
import { BookingsFilters } from '@/components/ui/bookings/booking-filters/BookingsFilters';
import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { BookingStatus } from '@/interfaces';
import { PlusIcon } from '@primer/octicons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import './bookingsPage.scss';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Bookings page to manage hotel reservations',
};
type Props = {
  searchParams: Promise<{
    search?: string;
    status?: BookingStatus;
    sort?: string;
    page?: string;
  }>;
};

const BookingsPage = async ({ searchParams }: Props) => {
  const search = (await searchParams).search || '';
  const status = (await searchParams).status;
  const sortBy = (await searchParams).sort;
  const page = (await searchParams).page || '1';

  return (
    <section>
      <div className="bookings-page__header">
        <BookingsFilters />
        <Link className="booking-add" href={`/bookings/new`}>
          New Booking
          <PlusIcon className="booking-add__icon" size={20} />
        </Link>
      </div>

      <Suspense key={search + status + sortBy + page} fallback={<TableSkeleton />}>
        <BookingContent search={search} status={status} orderBy={sortBy} page={+page} />
      </Suspense>
    </section>
  );
};

export default BookingsPage;

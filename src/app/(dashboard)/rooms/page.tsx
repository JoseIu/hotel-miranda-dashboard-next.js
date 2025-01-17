import { RoomFilters } from '@/components/rooms/room-filters/RoomFilters';
import { RoomContent } from '@/components/rooms/room-table/RoomContent';
import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Rooms',
  description: 'Rooms page to manage hotel rooms',
};

type Props = {
  searchParams: Promise<{
    filter?: string;
    page?: string;
  }>;
};

const RoomsPage = async ({ searchParams }: Props) => {
  const filter = (await searchParams).filter || '';
  const page = (await searchParams).page || '1';

  return (
    <section className="rooms-page">
      <RoomFilters />
      <Suspense key={filter + page} fallback={<TableSkeleton />}>
        <RoomContent filter={filter} page={+page} />
      </Suspense>
    </section>
  );
};

export default RoomsPage;

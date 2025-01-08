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
  }>;
};

const RoomsPage = async ({ searchParams }: Props) => {
  const filter = (await searchParams).filter || '';

  return (
    <section>
      <RoomFilters />
      <Suspense key={filter} fallback={<TableSkeleton />}>
        <RoomContent filter={filter} />
      </Suspense>
    </section>
  );
};

export default RoomsPage;

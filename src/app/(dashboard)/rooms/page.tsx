import { RoomContent } from '@/components/rooms/room-table/RoomContent';
import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { Suspense } from 'react';

const RoomsPage = () => {
  return (
    <section>
      <Suspense fallback={<TableSkeleton />}>
        <RoomContent />
      </Suspense>
    </section>
  );
};

export default RoomsPage;

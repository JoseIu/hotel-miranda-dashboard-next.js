import { getAllRooms } from '@/app/actions/rooms/getAllRooms';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { RoomTable } from './RoomTable';
type Props = {
  filter: string;
  page: number;
};
export const RoomContent = async ({ filter, page }: Props) => {
  const { rooms, totalPages } = await getAllRooms({ filter, page });
  return (
    <>
      <RoomTable rooms={rooms} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

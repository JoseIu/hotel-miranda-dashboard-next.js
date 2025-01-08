import { getAllRooms } from '@/app/actions/rooms/getAllRooms';
import { RoomTable } from './RoomTable';
type Props = {
  filter: string;
};
export const RoomContent = async ({ filter }: Props) => {
  const rooms = await getAllRooms({ filter });
  return <RoomTable rooms={rooms.rooms} />;
};

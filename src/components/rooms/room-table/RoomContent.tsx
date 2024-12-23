import { getAllRooms } from '@/app/actions/rooms/getAllRooms';
import { RoomTable } from './RoomTable';

export const RoomContent = async () => {
  const rooms = await getAllRooms();
  return <RoomTable rooms={rooms.rooms} />;
};

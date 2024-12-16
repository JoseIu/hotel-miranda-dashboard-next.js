import { getAllRooms } from '@/app/actions/rooms/getAllRooms';

const RoomsPage = async () => {
  const rooms = await getAllRooms();
  console.log(rooms);
  return <div>RoomsPage</div>;
};

export default RoomsPage;

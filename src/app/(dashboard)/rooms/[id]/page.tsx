'use client';
import { EditRoomForm } from '@/components/rooms/new-room-form/EditRoomForm';
import { GoBack } from '@/components/ui/go-back/GoBack';
import { useRoomsStore } from '@/store/rooms/roomsStore';
import { use } from 'react';

type Props = {
  params: Promise<{ id?: string }>;
};
const EditRoomPage = ({ params }: Props) => {
  const { id } = use(params);

  const room = useRoomsStore((state) => state.rooms).find((room) => room.id === id);
  return (
    <div className="section-form">
      <GoBack />

      <EditRoomForm room={room} />
    </div>
  );
};

export default EditRoomPage;

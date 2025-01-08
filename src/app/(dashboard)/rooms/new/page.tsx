import { NewRoomForm } from '@/components/rooms/new-room-form/NewRoomForm';
import { GoBack } from '@/components/ui/go-back/GoBack';

const NewRoomPage = () => {
  return (
    <div className="section-form">
      <GoBack />
      <NewRoomForm />
    </div>
  );
};

export default NewRoomPage;

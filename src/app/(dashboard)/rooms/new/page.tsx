import { NewRoomForm } from '@/components/rooms/new-room-form/NewRoomForm';
import { GoBack } from '@/components/ui/go-back/GoBack';

const NewRoomPage = () => {
  return (
    <section className="section-form">
      <GoBack />
      <NewRoomForm />
    </section>
  );
};

export default NewRoomPage;

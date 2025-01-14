import { NewUserForm } from '@/components/rooms/user-forms/NewUserForm';
import { GoBack } from '@/components/ui/go-back/GoBack';

const NewUserPage = () => {
  return (
    <section className="section-form">
      <GoBack />
      <NewUserForm />
    </section>
  );
};

export default NewUserPage;

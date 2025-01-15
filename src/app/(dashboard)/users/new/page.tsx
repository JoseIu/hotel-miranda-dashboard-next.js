import { GoBack } from '@/components/ui/go-back/GoBack';
import { NewUserForm } from '@/components/users/user-forms/NewUserForm';

const NewUserPage = () => {
  return (
    <section className="section-form">
      <GoBack />
      <NewUserForm />
    </section>
  );
};

export default NewUserPage;

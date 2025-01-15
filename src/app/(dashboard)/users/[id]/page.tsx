'use client';

import { GoBack } from '@/components/ui/go-back/GoBack';
import { EditUserForm } from '@/components/users/user-forms/EditUserForm';
import { useUsersStore } from '@/store/users/usersStore';
import { use } from 'react';

type Props = {
  params: Promise<{ id?: string }>;
};
const EditUserPage = ({ params }: Props) => {
  const { id } = use(params);

  const user = useUsersStore((state) => state.users).find((user) => user.id === id);
  return (
    <section className="section-form">
      <GoBack />

      <EditUserForm user={user} />
    </section>
  );
};

export default EditUserPage;

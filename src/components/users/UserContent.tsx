import { getUsers } from '@/app/actions/users/getUsers';
import { UserTable } from './user-table/UserTable';

type Props = {
  search: string;
  status: string;
};

export const UserContent = async ({ search, status }: Props) => {
  const usersList = await getUsers({ search, status });

  return <UserTable user={usersList.users} />;
};

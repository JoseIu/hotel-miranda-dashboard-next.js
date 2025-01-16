import { getUsers } from '@/app/actions/users/getUsers';
import { Pagination } from '../ui/pagination/Pagination';
import { UserTable } from './user-table/UserTable';

type Props = {
  search: string;
  status: string;
  page: number;
};

export const UserContent = async ({ search, status, page }: Props) => {
  const usersList = await getUsers({ search, status, page });

  // if (!usersList.users.length) redirect('/users');

  return (
    <>
      <UserTable user={usersList.users} />

      <Pagination totalPages={usersList.totalPages!} />
    </>
  );
};

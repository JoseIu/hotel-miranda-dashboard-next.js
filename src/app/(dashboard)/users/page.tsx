import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { UserContent } from '@/components/users/UserContent';
import { UsersFilter } from '@/components/users/users-filters/UsersFilter';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users page to manage hotel users',
};
type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const UsersPage = async ({ searchParams }: Props) => {
  const serarch = (await searchParams).search || '';
  const status = (await searchParams).status || '';
  const page = (await searchParams).page || '1';
  return (
    <section>
      <UsersFilter />
      <Suspense key={serarch + status + page} fallback={<TableSkeleton />}>
        <UserContent search={serarch} status={status} page={+page} />
      </Suspense>
    </section>
  );
};

export default UsersPage;

import { getAllMessages } from '@/app/actions/messages/getAllMessages';
import { Pagination } from '../ui/pagination/Pagination';
import { ContactTable } from './ContactTable';
type Props = {
  page: number;
};
export const ContactContent = async ({ page }: Props) => {
  const { messages, totalPages } = await getAllMessages({ page });
  return (
    <>
      <ContactTable messages={messages} />

      <Pagination totalPages={totalPages} />
    </>
  );
};

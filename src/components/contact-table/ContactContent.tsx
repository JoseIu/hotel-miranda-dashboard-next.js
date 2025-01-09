import { getAllMessages } from '@/app/actions/messages/getAllMessages';
import { ContactTable } from './ContactTable';

export const ContactContent = async () => {
  const messages = await getAllMessages();
  return <ContactTable messages={messages} />;
};

import { getAllMessages } from '@/app/actions/messages/getAllMessages';
import { Carousel } from '../carousel/Carousel';

export const CarouselContent = async () => {
  const { messages } = await getAllMessages();

  return <Carousel messages={messages} />;
};

import { CarouselContent } from '@/components/dashboard/carousel-content/CarouselContent';
import { MessageSkeleton } from '@/components/ui/message-skleton/MessageSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard to manage hotel reservations',
};

const DashBoardPage = () => {
  return (
    <section>
      DashBoardPage
      <Suspense fallback={<MessageSkeleton />}>
        <CarouselContent />
      </Suspense>
    </section>
  );
};

export default DashBoardPage;

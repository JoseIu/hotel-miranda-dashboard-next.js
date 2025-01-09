import { ContactContent } from '@/components/contact-table/ContactContent';
import { CarouselContent } from '@/components/dashboard/carousel-content/CarouselContent';
import { MessageSkeleton } from '@/components/ui/message-skleton/MessageSkeleton';
import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { Suspense } from 'react';

const ContactPage = () => {
  return (
    <section>
      <Suspense fallback={<MessageSkeleton />}>
        <CarouselContent />
      </Suspense>

      <Suspense fallback={<TableSkeleton rows={6} />}>
        <ContactContent />
      </Suspense>
    </section>
  );
};

export default ContactPage;

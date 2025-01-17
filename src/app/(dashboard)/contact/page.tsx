import { ContactContent } from '@/components/contact-table/ContactContent';
import { CarouselContent } from '@/components/dashboard/carousel-content/CarouselContent';
import { MessageSkeleton } from '@/components/ui/message-skleton/MessageSkeleton';
import { TableSkeleton } from '@/components/ui/table-skeleton/TableSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page to manage messages',
};
type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const ContactPage = async ({ searchParams }: Props) => {
  const page = (await searchParams).page || '1';
  return (
    <section>
      <Suspense fallback={<MessageSkeleton />}>
        <CarouselContent />
      </Suspense>

      <Suspense key={page} fallback={<TableSkeleton rows={6} />}>
        <ContactContent page={+page} />
      </Suspense>
    </section>
  );
};

export default ContactPage;

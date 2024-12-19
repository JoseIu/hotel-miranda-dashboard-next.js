import { NewBookingForm } from '@/components';
import { GoBack } from '@/components/ui/go-back/GoBack';

const NewBookingPage = () => {
  return (
    <div className="section-form">
      <GoBack />
      <NewBookingForm />
    </div>
  );
};

export default NewBookingPage;

'use client';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { RoomType } from '@/interfaces/roomResp';
import { use, useEffect, useState } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const BookingFormPage = ({ params }: Props) => {
  const { id } = use(params);

  const [date, setDate] = useState({
    start: '',
    end: '',
  });

  console.log({ id });

  const checkAvailabilityy = async (start: string, end: string, room_type: RoomType) => {
    if (!start || !end) return;
    const response = await checkAvailability(start, end, room_type);

    console.log({ response });
  };

  useEffect(() => {
    if (!date.start || !date.end) return;

    checkAvailabilityy(date.start, date.end, 'SINGLE_BED');
  }, [date.end, date.start]);

  return (
    <div>
      BookingFormPage
      <div>
        <label htmlFor="check_in">check in</label>
        <input
          type="date"
          name="check_in"
          id="check_in"
          onChange={(ev) => setDate((prev) => ({ ...prev, start: ev.target.value }))}
        />

        <label htmlFor="check_out">check out</label>
        <input
          type="date"
          name="check_out"
          id="check_out"
          onChange={(ev) => setDate((prev) => ({ ...prev, end: ev.target.value }))}
        />
      </div>
    </div>
  );
};

export default BookingFormPage;

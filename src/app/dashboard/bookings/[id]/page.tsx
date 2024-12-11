'use client';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { DatePicker, InputForm } from '@/components';
import { RoomAvailability, RoomType } from '@/interfaces/roomResp';
import { zodResolver } from '@hookform/resolvers/zod';
import { use, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { BookingSchema, bookingShema } from './zod/bookingSchema';

type Props = {
  params: Promise<{ id: string }>;
};

const BookingFormPage = ({ params }: Props) => {
  const { id } = use(params);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingShema),
  });

  const checkIn = useWatch({ control, name: 'checkin' });
  const checkOut = useWatch({ control, name: 'checkOut' });
  const [roomsAvailable, setRoomsAvailable] = useState<RoomAvailability[]>([]);

  console.log({ checkIn, checkOut });

  console.log({ id });

  const checkAvailabilityy = async (start: string, end: string, room_type: RoomType) => {
    if (!start || !end) return;
    const response = await checkAvailability(start, end, room_type);
    if (response?.error) return;

    setRoomsAvailable(response!.availableRooms);
  };

  const onHandleSubmit: SubmitHandler<BookingSchema> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    checkAvailabilityy(checkIn, checkOut, 'SINGLE_BED');
  }, [checkIn, checkOut]);

  return (
    <div>
      <h2>BookingFormPage</h2>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div>
          <InputForm
            label="Name"
            id="name"
            error={errors['name']}
            placeholder="Write guest name..."
            {...register('name')}
          />
          <InputForm
            label="Last name"
            id="lastName"
            error={errors['lastName']}
            placeholder="Write last name guest..."
            {...register('lastName')}
          />
        </div>

        <div>
          <DatePicker label="Check in" id="check-in" error={errors['checkin']} {...register('checkin')} />
          <DatePicker label="Check out" id="check-out" error={errors['checkOut']} {...register('checkOut')} />
        </div>

        <div>
          <label htmlFor="">Rooms Available</label>
          <select name="" id="">
            {!roomsAvailable.length && (
              <option value="">Select a check in abd Check out to get rooms availabe </option>
            )}
            {roomsAvailable.map((room) => (
              <option key={room.id} value={`${room.room_number}-${room.room_type}`}>
                {room.room_number} - {room.room_type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BookingFormPage;

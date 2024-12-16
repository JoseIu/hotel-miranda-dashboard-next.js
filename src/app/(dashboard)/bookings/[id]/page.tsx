'use client';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { DatePicker, InputForm, RoomsAvailable } from '@/components';
import { ROOM_TYPE, RoomAvailability, RoomType } from '@/interfaces/roomResp';
import { zodResolver } from '@hookform/resolvers/zod';
import { use, useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { BookingSchema, bookingShema } from './zod/bookingSchema';

type Props = {
  params: Promise<{ id?: string }>;
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
  const roomType = useWatch({ control, name: 'roomType' });

  console.log({ checkIn, checkOut });

  console.log({ id });

  const [isPending, startTransition] = useTransition();
  const [roomsAvailable, setRoomsAvailable] = useState<RoomAvailability[]>([]);
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
    if (!checkIn && !checkOut) return;

    startTransition(() => {
      checkAvailabilityy(checkIn, checkOut, roomType);
    });
  }, [checkIn, checkOut, roomType]);

  console.log({ isPending });

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
          <DatePicker label="Check in" id="checkin" error={errors['checkin']} {...register('checkin')} />
          <DatePicker label="Check out" id="checkOut" error={errors['checkOut']} {...register('checkOut')} />
        </div>

        <div>
          <select id="roomType" {...register('roomType')}>
            <option value=""> select a room type </option>
            {ROOM_TYPE.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <RoomsAvailable roomsAvailable={roomsAvailable} isPending={isPending} />
        </div>

        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default BookingFormPage;

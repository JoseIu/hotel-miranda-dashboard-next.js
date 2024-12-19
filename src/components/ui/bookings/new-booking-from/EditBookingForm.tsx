'use client';
import {
  BOOKING_STATUS,
  BookingSchema,
  bookingShema,
} from '@/app/(dashboard)/bookings/[id]/zod/bookingSchema';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { ROOM_TYPE_FORM } from '@/constants/roomTypeForm';
import { Booking, RoomAvailability, RoomType } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { RoomsAvailable } from '../rooms-available/RoomsAvailable';

type Props = {
  booking?: Booking | undefined;
};

export const EditBookingForm = ({ booking }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingShema),
  });

  const checkIn = useWatch({ control, name: 'check_in' });
  const checkOut = useWatch({ control, name: 'check_out' });
  const roomType = useWatch({ control, name: 'room_type' });

  const [isPending, startTransition] = useTransition();
  const [roomsAvailable, setRoomsAvailable] = useState<RoomAvailability[]>([]);
  const checkAvailabilityy = async (start: string, end: string, room_type: RoomType) => {
    if (!start || !end) return;
    const response = await checkAvailability(start, end, room_type);
    if (response?.error) return;

    setRoomsAvailable(response!.availableRooms ?? []);
  };

  const onHandleEdit: SubmitHandler<BookingSchema> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!checkIn && !checkOut) return;

    startTransition(() => {
      checkAvailabilityy(checkIn, checkOut, roomType);
    });
  }, [checkIn, checkOut, roomType]);

  useEffect(() => {
    if (!booking) return;
    const { id, guest_image, special_request, ...rest } = booking;
    const bookingToEdit = {
      ...rest,
      special_request: special_request || '',
    };

    reset(bookingToEdit);
  }, [booking, reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onHandleEdit)}>
      <div className="form__row">
        <InputForm
          label="Name"
          id="name"
          error={errors['guest_name']}
          placeholder="Write guest name..."
          {...register('guest_name')}
        />
        <InputForm
          label="Last name"
          id="lastName"
          error={errors['guest_last_name']}
          placeholder="Write last name guest..."
          {...register('guest_last_name')}
        />
      </div>

      <div className="form__row">
        <DatePicker label="Check in" id="check_in" error={errors['check_in']} {...register('check_in')} />
        <DatePicker label="Check out" id="check_out" error={errors['check_out']} {...register('check_out')} />
      </div>

      <div className="form__row">
        <SelecForm
          error={errors['room_type']}
          id="roomType"
          {...register('room_type')}
          label="Select a room type"
          options={ROOM_TYPE_FORM}
        />

        <RoomsAvailable roomsAvailable={roomsAvailable} isPending={isPending} />
      </div>
      <div className="form__row">
        <SelecForm
          error={errors['status']}
          id="roomStatus"
          {...register('status')}
          label="Satatus"
          options={BOOKING_STATUS.map((status) => ({ label: status, value: status }))}
        />
      </div>
      <div className="form__row">
        <textarea
          className="form__area"
          placeholder="Write some special request"
          {...register('special_request')}
        ></textarea>
      </div>

      <button className="form__submit" type="submit">
        Save updates
      </button>
    </form>
  );
};

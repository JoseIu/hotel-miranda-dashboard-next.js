'use client';
import {
  BOOKING_STATUS,
  BookingSchema,
  bookingShema,
} from '@/app/(dashboard)/bookings/[id]/zod/bookingSchema';
import { addBooking } from '@/app/actions/bookings/addBooking';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { ROOM_TYPE_FORM } from '@/constants/roomTypeForm';
import { BookingToSend, RoomAvailability, RoomType } from '@/interfaces';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import './form.scss';

export const NewBookingForm = () => {
  const [roomsAvailable, setRoomsAvailable] = useState<RoomAvailability[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingShema),
  });
  console.log({ roomsAvailable });
  const checkIn = useWatch({ control, name: 'check_in' });
  const checkOut = useWatch({ control, name: 'check_out' });
  const roomType = useWatch({ control, name: 'room_type' });

  const [isPending, startTransition] = useTransition();
  const [isSubmiting, startSubmiting] = useTransition();
  const checkAvailabilityy = async (start: string, end: string, room_type: RoomType) => {
    if (!start || !end) return;
    const response = await checkAvailability(start, end, room_type);
    if (response?.error) return;

    setRoomsAvailable(response!.availableRooms);
  };

  console.log(isSubmiting);
  const onHandleSubmit: SubmitHandler<BookingSchema> = async (data) => {
    const { special_request, room_number, ...rest } = data;
    const bookingToSend: BookingToSend = {
      ...rest,
      guest_image: faker.image.avatar(),
      room_number: +room_number,
      special_request: special_request || null,
    };

    console.log({ bookingToSend });
    startSubmiting(async () => {
      const response = await addBooking({ booking: bookingToSend });
      if (response?.error) {
        console.log('Error al crear la reserva');
      }
      console.log('Reserva creada correctamente');
    });
  };

  useEffect(() => {
    if (!checkIn && !checkOut) return;

    startTransition(() => {
      checkAvailabilityy(checkIn, checkOut, roomType);
    });
  }, [checkIn, checkOut, roomType]);

  return (
    <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
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
        <SelecForm
          id="rooms-available"
          label="Select a room"
          error={errors['room_number']}
          placeHolder="---select a room--"
          options={roomsAvailable.map((room) => ({
            label: `${room.room_number}-${room.room_type}`,
            value: `${room.room_number}`,
          }))}
          {...register('room_number')}
        />
      </div>
      <div className="form__row">
        <SelecForm
          error={errors['status']}
          id="roomStatus"
          {...register('status')}
          label="Satatus"
          options={BOOKING_STATUS.map((status) => ({ label: status, value: status }))}
        />
        <DatePicker
          label="Order date"
          id="order_date"
          error={errors['order_date']}
          {...register('order_date')}
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
        {isSubmiting ? 'Adding...' : 'Submit'}
      </button>
    </form>
  );
};

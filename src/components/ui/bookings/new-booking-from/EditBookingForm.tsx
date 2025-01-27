'use client';
import {
  BOOKING_STATUS,
  BookingSchema,
  bookingShema,
} from '@/app/(dashboard)/bookings/[id]/zod/bookingSchema';
import { checkAvailability } from '@/app/actions/bookings/checkAvailability';
import { updateBooking } from '@/app/actions/bookings/updateBooking';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { ROOM_TYPE_FORM } from '@/constants/roomTypeForm';
import { Booking, BookingToEdit, RoomAvailability, RoomType } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  booking?: Booking | undefined;
};

export const EditBookingForm = ({ booking }: Props) => {
  const router = useRouter();
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

  const onHandleEdit: SubmitHandler<BookingSchema> = async (data) => {
    if (!booking) return;
    const { room_number, order_date, check_in, check_out, special_request, ...rest } = data;

    const bookingToEdit: BookingToEdit = {
      ...rest,
      order_date: new Date(order_date),
      check_in: new Date(check_in),
      check_out: new Date(check_out),
      room_number: +room_number,
      special_request: special_request || null,
    };

    const bookingUdated = await updateBooking(booking.id, bookingToEdit);
    if (bookingUdated?.error) {
      toast.error('Error updating booking');
      return;
    }

    toast.success('Booking updated');
    router.push('/bookings');
  };

  useEffect(() => {
    if (booking) return;
    if (!checkIn && !checkOut) return;

    startTransition(() => {
      checkAvailabilityy(checkIn, checkOut, roomType);
    });
  }, [checkIn, checkOut, roomType, booking]);

  useEffect(() => {
    if (!booking) return;
    const { id, guest_image, special_request, room_number, ...rest } = booking;
    const bookingToEdit = {
      ...rest,
      check_in: new Date(rest.check_in).toISOString().split('T')[0],
      check_out: new Date(rest.check_out).toISOString().split('T')[0],
      order_date: new Date(rest.order_date).toISOString().split('T')[0],
      room_number: `${room_number}`,

      special_request: special_request || '',
    };
    const roomType: RoomAvailability = {
      id: booking.room_id,
      room_number: booking.room_number,
      room_type: booking.room_type,
    };
    setRoomsAvailable([roomType]);

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
        <DatePicker
          label="Check in"
          id="check_in"
          min={booking?.check_in || new Date().toISOString().split('T')[0]}
          error={errors['check_in']}
          {...register('check_in')}
        />
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

        {/* <RoomsAvailable roomsAvailable={roomsAvailable} isPending={isPending} /> */}
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
          min={booking?.order_date || new Date().toISOString().split('T')[0]}
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
        Save updates
      </button>
    </form>
  );
};

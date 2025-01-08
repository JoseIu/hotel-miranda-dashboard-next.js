'use client';

import { createRoom } from '@/app/actions/rooms/createRoom';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { ROOM_TYPE_FORM } from '@/constants/roomTypeForm';
import { CreateRoom } from '@/interfaces';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ROOM_STATUS, RoomSchema, roomSchema } from './roomschema';

export const NewRoomForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
  });

  const [isSubmiting, startSubmiting] = useTransition();

  const onHandleSubmit: SubmitHandler<RoomSchema> = async (data) => {
    const { description, discount_percentage, price, room_type, status } = data;

    const newRoom: CreateRoom = {
      description,
      room_type,
      discount_percentage: +discount_percentage,
      price: +price,
      status,
      offer: +discount_percentage > 0,
      room_number: faker.helpers.rangeToNumber({ min: 2, max: 1000 }),
      room_images: ['room1.webp', 'room2.webp', 'room3.webp'],
    };

    startSubmiting(async () => {
      const response = await createRoom(newRoom);
      if (response?.error) {
        toast.error('Error creating room');
        return;
      }
      toast.success('Room created successfully');
      router.push('/rooms');
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="form__row">
        <SelecForm
          label="Room type"
          error={errors['room_type']}
          id="roomType"
          {...register('room_type')}
          options={ROOM_TYPE_FORM}
        />
        <SelecForm
          label="Status"
          id="rooms-status"
          error={errors['status']}
          placeHolder="---select a status--"
          options={ROOM_STATUS.map((status) => ({
            label: `${status.toLocaleLowerCase()}`,
            value: `${status}`,
          }))}
          {...register('status')}
        />
      </div>

      <div className="form__row">
        <InputForm
          label="Discount"
          id="room-discount"
          error={errors['discount_percentage']}
          placeholder="Discount percentage..."
          {...register('discount_percentage')}
        />
        <InputForm
          label="Price"
          id="room-price"
          error={errors['price']}
          placeholder="Room price..."
          {...register('price')}
        />
      </div>

      <div className="form__row">
        <textarea
          className="form__area"
          placeholder="Write a short description..."
          {...register('description')}
        ></textarea>
      </div>

      <button className="form__submit" type="submit">
        {isSubmiting ? 'Adding...' : 'Submit'}
      </button>
    </form>
  );
};

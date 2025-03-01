'use client';
import { updateRoomAction } from '@/app/actions/rooms/updateRoom';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { ROOM_TYPE_FORM } from '@/constants/roomTypeForm';
import { Room, RoomType, UpdateRoom } from '@/interfaces';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ROOM_STATUS, roomSchema, RoomSchema } from './roomschema';

type Props = {
  room: Room | undefined;
};

export const EditRoomForm = ({ room }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
  });

  const [isSubmiting, startSubmiting] = useTransition();

  const onHandleSubmit: SubmitHandler<RoomSchema> = async (data) => {
    const toastId = toast.loading('Saving updates...');
    const { description, discount_percentage, price, room_type, status } = data;

    const updateRoom: UpdateRoom = {
      description,
      room_type,
      discount_percentage: +discount_percentage,
      price: +price,
      status,
      offer: +discount_percentage > 0,
      room_number: faker.helpers.rangeToNumber({ min: 2, max: 1000 }),
    };

    startSubmiting(async () => {
      const roomUpdated = await updateRoomAction(room!.id, updateRoom);

      if (roomUpdated?.error) {
        toast.dismiss(toastId);
        toast.error('Error updating room');
        return;
      }
      toast.dismiss(toastId);
      toast.success('Room updated');

      router.push('/rooms');
    });
  };

  useEffect(() => {
    if (!room) return;
    const { description, discount_percentage, price, room_type, status } = room;

    const roomToEdit = {
      description,
      room_type: room_type as RoomType,
      discount_percentage: discount_percentage.toString(),
      price: price.toString(),
      status,
    };
    reset(roomToEdit);
  }, [room, reset]);

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

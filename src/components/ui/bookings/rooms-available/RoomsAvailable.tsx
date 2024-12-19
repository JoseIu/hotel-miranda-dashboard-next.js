import { BookingSchema } from '@/app/(dashboard)/bookings/[id]/zod/bookingSchema';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { RoomAvailability } from '@/interfaces';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  roomsAvailable: RoomAvailability[];
  isPending: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<BookingSchema>;
};

export const RoomsAvailable = ({ isPending, roomsAvailable, error }: Props) => {
  return (
    <>
      {!roomsAvailable.length && <span>Set check in and Check out to get available rooms* </span>}

      {isPending && !roomsAvailable.length ? (
        <span>Loading...</span>
      ) : (
        roomsAvailable.length && (
          <>
            <SelecForm
              id="rooms-available"
              label="Select a room"
              error={error}
              options={roomsAvailable.map((room) => ({
                label: `${room.room_number}-${room.room_type}`,
                value: `${room.room_number}`,
              }))}
            />
          </>
        )
      )}
    </>
  );
};

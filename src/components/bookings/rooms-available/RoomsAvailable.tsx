import { RoomAvailability } from '@/interfaces';

type Props = {
  roomsAvailable: RoomAvailability[];
  isPending: boolean;
};

export const RoomsAvailable = ({ isPending, roomsAvailable }: Props) => {
  return (
    <div>
      <label htmlFor="rooms">Rooms Available</label>
      {!roomsAvailable.length && !isPending && (
        <span>Select a check in abd Check out to get rooms availabe </span>
      )}

      {isPending ? (
        <span>Loading...</span>
      ) : (
        <select name="rooms" id="rooms">
          {roomsAvailable.map((room) => (
            <option key={room.id} value={`${room.room_number}-${room.room_type}`}>
              {room.room_number} - {room.room_type}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

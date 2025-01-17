'use client';
import { deleteRoom } from '@/app/actions/rooms/deleteRoom';
import { Modal } from '@/components/ui/modal/Modal';
import { Room } from '@/interfaces';
import { useRoomsStore } from '@/store/rooms/roomsStore';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RoomStatusBadge } from '../roo-status/RoomStatusBadge';
type Props = {
  rooms: Room[];
};
export const RoomTable = ({ rooms }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');

  const setRooms = useRoomsStore((state) => state.setRooms);
  setRooms(rooms);

  const onDeleteRoom = async () => {
    const toastId = toast.loading('Deleting room...');
    const roomDeleted = await deleteRoom(deleteId);

    if (roomDeleted?.error) {
      toast.dismiss(toastId);
      toast.error('Error deleting room');
      return;
    }

    toast.dismiss(toastId);
    toast.success('Room deleted successfully');
    router.refresh();
  };

  return (
    <>
      <section className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-tr">
              <th className="table__head-th">Room</th>
              <th className="table__head-th">Room Type</th>
              <th className="table__head-th">Amenities</th>
              <th className="table__head-th">Price</th>
              <th className="table__head-th">Offer Price</th>
              <th className="table__head-th">Status</th>
              <th className="table__head-th">Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {rooms.map((room) => (
              <tr className="table__body-tr" key={room.id}>
                <td className="table__body-td">
                  <span className="table__body-td">
                    {room.room_type} - {room.room_number}
                  </span>
                </td>
                <td className="table__body-td">{room.room_type}</td>
                <td className="table__body-td table__body-td--hiden">Amenities</td>
                <td className="table__body-td">{room.price}</td>
                <td className="table__body-td">{room.offer ? `${room.discount_percentage}%` : 'No Offer'}</td>
                <td className="table__body-td">
                  <RoomStatusBadge status={room.status} />
                </td>

                <td className="table__body-td">
                  <div className="table__body-action">
                    <Link href={`/rooms/${room.id}`}>
                      <PencilIcon size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(room.id);
                      }}
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div className="modal-delete">
          <button
            className="modal-delete__btn modal-delete__btn--yes"
            onClick={() => {
              setIsModalOpen(false);
              onDeleteRoom();
            }}
          >
            Yes
          </button>
          <button
            className="modal-delete__btn modal-delete__btn--no"
            onClick={() => {
              setIsModalOpen(false);
              setDeleteId('');
            }}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

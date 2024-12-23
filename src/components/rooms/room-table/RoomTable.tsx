'use client';
import { Room } from '@/interfaces';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useState } from 'react';
type Props = {
  rooms: Room[];
};
export const RoomTable = ({ rooms }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>('');

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
                <td className="table__body-td">{room.status}</td>

                <td className="table__body-td">
                  <div className="table__body-action">
                    <Link href={`/`}>
                      <PencilIcon size={20} />
                    </Link>
                    <button>
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div>{modalContent && modalContent}</div>
      </Modal> */}
    </>
  );
};

'use client';

import { deleteBooking } from '@/app/actions/bookings/deleteBooking';
import { BookingStatusBadge } from '@/components/ui/booking-status/BookingStatusBadge';
import { Modal } from '@/components/ui/modal/Modal';
import { RoomTypBadge } from '@/components/ui/room-type/RoomTypBadge';
import { Booking } from '@/interfaces';
import { useBookingStore } from '@/store/booking/bookingStore';
import { formatter } from '@/utils';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import './bookingTable.scss';

type Props = {
  bookings: Booking[];
};
export const BookingsTable = ({ bookings }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>('');
  const [deleteId, setDeleteId] = useState<string>('');

  const setBookings = useBookingStore((state) => state.addBookings);

  useEffect(() => {
    setBookings(bookings);
  }, [bookings, setBookings]);

  const onDeleteBooking = async () => {
    const toastId = toast.loading('Deleting booking...');
    const bookingDeleted = await deleteBooking(deleteId);

    if (bookingDeleted?.error) {
      toast.dismiss(toastId);
      toast.error('Error deleting booking');
      return;
    }
    toast.dismiss(toastId);
    toast.success('Booking deleted successfully');
    router.refresh();
  };
  return (
    <>
      <section className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-tr">
              <th className="table__head-th">Guest</th>
              <th className="table__head-th">Order Date</th>
              <th className="table__head-th table__head-th--hiden">Check In</th>
              <th className="table__head-th">CheckOut</th>
              <th className="table__head-th">Special Request</th>
              <th className="table__head-th">Room Type</th>
              <th className="table__head-th">Status</th>
              <th className="table__head-th">Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {bookings.map((booking) => (
              <tr className="table__body-tr" key={booking.id}>
                <td className="table__body-td">
                  <Link href={`/bookings/info/${booking.id}`} className="table__body-sender">
                    <img className="table__body-img" src={booking.guest_image} alt={booking.guest_name} />
                    <span className="table__body-td">
                      {booking.guest_name} - {booking.guest_last_name}
                    </span>
                  </Link>
                </td>
                <td className="table__body-td">{formatter(booking.order_date)}</td>
                <td className="table__body-td table__body-td--hiden">
                  <time dateTime={formatter(booking.check_in)}>{formatter(booking.check_in)}</time>
                </td>
                <td className="table__body-td">{formatter(booking.check_out)}</td>
                <td className="table__body-td">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalContent(booking.special_request);
                    }}
                  >
                    Show request
                  </button>
                </td>
                <td className="table__body-td">
                  <RoomTypBadge roomType={booking.room_type} />
                </td>
                <td className="table__body-td">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="table__body-td">
                  <div className="table__body-action">
                    <Link href={`/bookings/${booking.id}`}>
                      <PencilIcon size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(booking.id);
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
      {modalContent && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            setModalContent(null);
          }}
        >
          <div>{modalContent && modalContent}</div>
        </Modal>
      )}

      {!modalContent && (
        <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <div className="modal-delete">
            <h2 className="modal-delete__title">Are you sure you want to delete this booking?</h2>
            <div className="modal-delete__btns">
              <button
                className="modal-delete__btn modal-delete__btn--yes"
                onClick={() => {
                  setIsModalOpen(false);
                  onDeleteBooking();
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
          </div>
        </Modal>
      )}
    </>
  );
};

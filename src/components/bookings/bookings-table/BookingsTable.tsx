'use client';

import { Booking } from '@/interfaces';
import { formatter } from '@/utils';
import Link from 'next/link';
import './bookingTable.scss';

type Props = {
  bookings: Booking[];
};
// formatter
export const BookingsTable = ({ bookings }: Props) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head-tr">
            <th className="table__head-th">Guest</th>
            <th className="table__head-th">Order Date</th>
            <th className="table__head-th table__head-th--hiden">Check In</th>
            <th className="table__head-th">CheckOut</th>
            <th className="table__head-th">Special Request</th>
            <th className="table__head-th">Room Type</th>
            <th className="table__head-th">Action</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {bookings.map((booking) => (
            <tr className="table__body-tr" key={booking.id}>
              <td className="table__body-td">
                <div className="table__body-sender">
                  <img className="table__body-img" src={booking.guest_image} alt={booking.guest_name} />
                  <span className="table__body-td">{booking.guest_name}</span>
                </div>
              </td>
              <td className="table__body-td">{formatter(booking.order_date)}</td>
              <td className="table__body-td table__body-td--hiden">
                <time dateTime={formatter(booking.check_in)}>{formatter(booking.check_in)}</time>
              </td>
              <td className="table__body-td">{formatter(booking.check_out)}</td>
              <td className="table__body-td">
                <p>{booking.special_request}</p>
              </td>
              <td className="table__body-td">{booking.room_type}</td>
              <td className="table__body-td">
                <p>{booking.status}</p>
              </td>
              <td className="table__body-td">
                <div>
                  <Link href={`/dashboard/bookings/${booking.id}`}>editar</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

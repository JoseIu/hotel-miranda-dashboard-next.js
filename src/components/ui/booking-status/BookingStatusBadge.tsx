import { BookingStatus } from '@prisma/client';
import './bookingStatusBadge.scss';

type Props = {
  status: BookingStatus;
};

const statusMap = {
  In_PROGRESS: {
    color: 'blue',
    text: 'In Progress',
  },
  CHECK_IN: {
    color: 'green',
    text: 'Check In',
  },
  CHECK_OUT: {
    color: 'orange',
    text: 'Check Out',
  },
};

export const BookingStatusBadge = ({ status }: Props) => {
  const { color, text } = statusMap[status];
  return <div className={`status-badge ${color}`}>{text}</div>;
};

import { RoomStatus } from '@/interfaces';
import './roomStatusBadge.scss';

type Props = {
  status: RoomStatus;
};
export const RoomStatusBadge = ({ status }: Props) => {
  const statusColor = status === 'BOOKED' ? 'booked' : 'available';
  return <span className={`room-status ${statusColor}`}>{status}</span>;
};

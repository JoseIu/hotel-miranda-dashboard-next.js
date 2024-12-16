import type { RoomType } from '@/interfaces';
import './roomTypeBadge.scss';

type Props = {
  roomType: RoomType;
};

const roomTypeMap = {
  SINGLE_BED: 'Single Bed',
  DOUBLE_BED: 'Double Bed',
  DOUBLE_SUPERIOR: 'Double Superior',
  SUITE: 'Suite',
};
export const RoomTypBadge = ({ roomType }: Props) => {
  const roomTypeLabel = roomTypeMap[roomType];
  return <div className="room-type">{roomTypeLabel}</div>;
};

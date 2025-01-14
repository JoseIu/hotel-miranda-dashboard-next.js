import './userStatusBadge.scss';
type Props = {
  status: boolean;
};
export const UserStatusBadge = ({ status }: Props) => {
  const statusColor = status ? 'user-active' : 'user-inactive';
  return <span className={`room-status ${statusColor}`}>{status ? 'Active' : 'Inactive'}</span>;
};

import { SideBar } from '@/components';
import './layout.scss';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <SideBar />

      <div>{children}</div>
    </div>
  );
};

export default layout;

import { SideBar } from '@/components';
import { Header } from '@/components/ui/header/Header';
import './layout.scss';

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <SideBar />

      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;

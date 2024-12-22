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

      <div className="layout__content">
        <Header />
        <div className="section">{children}</div>
      </div>
    </div>
  );
};

export default layout;

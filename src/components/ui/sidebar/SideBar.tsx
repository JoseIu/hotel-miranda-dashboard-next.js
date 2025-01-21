'use client';
import { useSideBar } from '@/store/ui/sideBar';
import { CalendarIcon, InboxIcon, LockIcon, PersonIcon, ProjectIcon } from '@primer/octicons-react';
import { Logo } from '../logo/Logo';
import { ProfileCard } from '../profile-card/ProfileCard';
import './sideBard.scss';
import { SideBarItem } from './SideBarItem';

const menuPaths = [
  {
    path: '/',
    title: 'Dashboard',
    Icon: ProjectIcon,
  },
  {
    path: '/bookings',
    title: 'Bookings',
    Icon: CalendarIcon,
  },
  {
    path: '/rooms',
    title: 'Rooms',
    Icon: LockIcon,
  },
  {
    path: '/contact',
    title: 'Contacts',
    Icon: InboxIcon,
  },
  {
    path: '/users',
    title: 'Users',
    Icon: PersonIcon,
  },
];

export const SideBar = () => {
  const isSideBarOpen = useSideBar((state) => state.isSideBarOpen);
  const closeMenu = useSideBar((state) => state.closeSideBar);

  return (
    <div>
      {isSideBarOpen && <div className="side-bg"></div>}
      {isSideBarOpen && <div onClick={closeMenu} className="side-bg-close"></div>}
      <aside className={`side-bar ${isSideBarOpen && 'side-bar--open'}`}>
        <h1 className="side-bar__logo">
          <Logo /> iranda
        </h1>
        <ul className="side-bar__paths">
          {menuPaths.map((menu) => (
            <SideBarItem key={menu.path} path={menu.path} title={menu.title} Icon={menu.Icon} />
          ))}
        </ul>

        <ProfileCard />
      </aside>
    </div>
  );
};

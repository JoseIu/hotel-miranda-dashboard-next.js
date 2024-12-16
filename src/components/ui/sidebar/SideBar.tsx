'use client';
import { CalendarIcon, InboxIcon, LockIcon, PersonIcon, ProjectIcon } from '@primer/octicons-react';
import { Logo } from '../logo/Logo';
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
  return (
    <aside className="side-bar">
      <h1 className="side-bar__logo">
        <Logo /> iranda
      </h1>
      <ul className="side-bar__paths">
        {menuPaths.map((menu) => (
          <SideBarItem key={menu.path} path={menu.path} title={menu.title} Icon={menu.Icon} />
        ))}
      </ul>
    </aside>
  );
};

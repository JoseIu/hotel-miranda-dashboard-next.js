'use client';
import './sideBard.scss';
import { SideBarItem } from './SideBarItem';

const menuPaths = [
  {
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    path: '/dashboard/bookings',
    title: 'Bookings',
  },
  {
    path: '/dashboard/rooms',
    title: 'Rooms',
  },
  {
    path: '/dashboard/contact',
    title: 'Contacts',
  },
  {
    path: '/dashboard/users',
    title: 'Users',
  },
];

export const SideBar = () => {
  return (
    <aside className="side-bar">
      <ul className="side-bar__paths">
        {menuPaths.map((menu) => (
          <SideBarItem key={menu.path} path={menu.path} title={menu.title} />
        ))}
      </ul>
    </aside>
  );
};

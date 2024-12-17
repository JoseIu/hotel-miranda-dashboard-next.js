import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  path: string;
  title: string;
  Icon: React.ElementType;
};
export const SideBarItem = ({ path, title, Icon }: Props) => {
  const menuPath = usePathname();

  const isActive = menuPath === path && 'active';
  return (
    <li className="sidebar-item">
      <Link className={`sidebar-item__link ${isActive}`} href={path}>
        <Icon size={18} className="sidebar-item__icon" />
        <span className="sidebar-item__title">{title}</span>
      </Link>
    </li>
  );
};

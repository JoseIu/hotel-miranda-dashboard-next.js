import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  path: string;
  title: string;
};
export const SideBarItem = ({ path, title }: Props) => {
  const menuPath = usePathname();

  const isActive = menuPath === path && 'active';
  return (
    <li className="sidebar-item">
      <Link className={`sidebar-item__link ${isActive}`} href={path}>
        {title}
      </Link>
    </li>
  );
};

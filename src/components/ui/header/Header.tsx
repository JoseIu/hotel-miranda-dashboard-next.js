import './header.scss';
import { HeaderLogOut } from './HeaderLogOut';
import { HeaderToggle } from './HeaderToggle';
export const Header = () => {
  return (
    <header className="header">
      <HeaderToggle />
      <HeaderLogOut />
    </header>
  );
};

'use client';
import { useSideBar } from '@/store/ui/sideBar';
import { ThreeBarsIcon } from '@primer/octicons-react';

export const HeaderToggle = () => {
  const openMenu = useSideBar((state) => state.openSideBar);
  return (
    <button className="header__toggle" onClick={openMenu}>
      <ThreeBarsIcon size={24} />
    </button>
  );
};

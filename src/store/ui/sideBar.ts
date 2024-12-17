import { create } from 'zustand';

interface State {
  isSideBarOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
}

export const useSideBar = create<State>()((set) => ({
  isSideBarOpen: false,
  openSideBar: () => set({ isSideBarOpen: true }),
  closeSideBar: () => set({ isSideBarOpen: false }),
}));

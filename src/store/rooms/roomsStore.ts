import { Room } from '@/interfaces';
import { create } from 'zustand';

interface State {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

export const useRoomsStore = create<State>((set) => ({
  rooms: [],
  setRooms: (rooms: Room[]) => set({ rooms: rooms }),
}));

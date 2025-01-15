import { User } from '@/interfaces/user';
import { create } from 'zustand';

interface State {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<State>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users: users }),
}));

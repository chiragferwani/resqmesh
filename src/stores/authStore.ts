import { create } from 'zustand';
import { User } from '@/types';
import { mockUsers } from '@/data/users';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: User['role']) => void;
}

const savedUserId = localStorage.getItem('resqmesh_user');
const savedUser = savedUserId ? mockUsers.find(u => u.id === savedUserId) || null : null;

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: savedUser,
  isAuthenticated: !!savedUser,
  login: (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      localStorage.setItem('resqmesh_user', userId);
      set({ currentUser: user, isAuthenticated: true });
    }
  },
  logout: () => {
    localStorage.removeItem('resqmesh_user');
    set({ currentUser: null, isAuthenticated: false });
  },
  switchRole: (role) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      localStorage.setItem('resqmesh_user', user.id);
      set({ currentUser: user, isAuthenticated: true });
    }
  },
}));

import { create } from 'zustand';
import { AuthResponse } from '../types/api';

interface AuthState {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
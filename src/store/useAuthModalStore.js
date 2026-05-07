import { create } from 'zustand';

export const useAuthModalStore = create((set) => ({
  isOpen: false,
  type: 'LOGIN', // 'LOGIN' | 'REGISTER'
  defaultEmail: '',
  openModal: (type = 'LOGIN', defaultEmail = '') => set({ isOpen: true, type, defaultEmail }),
  closeModal: () => set({ isOpen: false, defaultEmail: '' }),
  setType: (type) => set({ type }),
}));

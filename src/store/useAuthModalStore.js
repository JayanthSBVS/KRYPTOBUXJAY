import { create } from 'zustand';

export const useAuthModalStore = create((set) => ({
  modalState: 'CLOSED', // 'LOGIN' | 'REGISTER' | 'CLOSED'
  prefilledEmail: '',
  openLogin: () => set({ modalState: 'LOGIN', prefilledEmail: '' }),
  openRegister: (email = '') => set({ modalState: 'REGISTER', prefilledEmail: email }),
  closeModal: () => set({ modalState: 'CLOSED', prefilledEmail: '' }),
  toggleModal: () => set((state) => ({
    modalState: state.modalState === 'LOGIN' ? 'REGISTER' : 'LOGIN'
  }))
}));

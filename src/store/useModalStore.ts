import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  youtube?: string;
};

type ModalState = {
  selectedItem: Item | null;
  openModal: (item: Item) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  selectedItem: null,
  openModal: (item) => set({ selectedItem: item }),
  closeModal: () => set({ selectedItem: null }),
}));

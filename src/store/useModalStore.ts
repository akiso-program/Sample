import { create } from "zustand";

export type Item = {
  id: string;
  name: string;
  category: string;
  image: string;
  youtube: string | null;
  description: string | null;
  created_at: string;
};

type ModalState = {
  selectedItem: Partial<Item> | null;
  openModal: (item: Partial<Item>) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  selectedItem: null,
  openModal: (item) => set({ selectedItem: item }),
  closeModal: () => set({ selectedItem: null }),
}));

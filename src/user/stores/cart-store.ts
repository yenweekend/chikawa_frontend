import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  ids: string[];

  setIds: (ids: string[]) => void;
  addId: (id: string) => void;
  removeId: (id: string) => void;
  toggleId: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ids: [],

      setIds: (ids) =>
        set((state) => ({
          ...state,
          ids,
        })),

      addId: (id) =>
        set((state) => ({
          ...state,
          ids: state.ids.includes(id) ? state.ids : [...state.ids, id],
        })),

      removeId: (id) =>
        set((state) => ({
          ...state,
          ids: state.ids.filter((i) => i !== id),
        })),

      toggleId: (id) =>
        set((state) => ({
          ...state,
          ids: state.ids.includes(id)
            ? state.ids.filter((i) => i !== id)
            : [...state.ids, id],
        })),

      clear: () =>
        set((state) => ({
          ...state,
          ids: [],
        })),
    }),
    {
      name: "cart-store",
      version: 1,
      partialize: (state) => ({ ids: state.ids }),
    }
  )
);

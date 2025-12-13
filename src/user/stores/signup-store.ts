import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface UserData {
  id?: number | null;
  email?: string | null;
  fullName?: string | null;
  lineId?: string | null;
}

interface UserState {
  user: UserData | null;
  isAuthenticated: boolean;

  setUser: (data: UserData) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (data) =>
        set((state) => {
          state.user = data;
          state.isAuthenticated = true;
        }),

      clearUser: () =>
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
        }),
    })),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

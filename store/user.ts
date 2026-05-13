import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserModel } from "@/models/user";

interface UserState {
  user: UserModel | null;
  _hasHydrated: boolean;
  setUser: (user: UserModel) => void;
  clearUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      _hasHydrated: false,
      setUser: (user: UserModel) => set({ user }),
      clearUser: () => set({ user: null }),
      setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),
    }),
    {
      name: "fbn_user_profile",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

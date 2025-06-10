import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PostLoginResponseSuccessType } from "@/web/types/auth";

export type AuthStoreType = {
  user: {
    id: PostLoginResponseSuccessType["id"];
    email: PostLoginResponseSuccessType["email"];
    token: PostLoginResponseSuccessType["token"];
  } | null;
  setUser: (user: AuthStoreType["user"]) => void;
  clearUser: () => void;
  isUserLoggedIn: () => boolean;
  isUserLoggedOut: () => boolean;
  token: () => string | null;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
      isUserLoggedIn: () => !!get().user,
      isUserLoggedOut: () => !get().user,
      token: () => get().user?.token || null,
    }),
    {
      name: "stage-locker-user-storage",
    },
  ),
);

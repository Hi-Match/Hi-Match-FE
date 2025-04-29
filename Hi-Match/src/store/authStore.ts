import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    isAuthenticated: boolean;
    login: (isAuth: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            isAuthenticated: false,
            login: isAuth => set({ isAuthenticated: isAuth }),
            logout: () => set({ isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

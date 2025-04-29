import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfo {
    memberID: string;
    memberMail: string;
    memberName: string;
    memberPhone: string;
    memberJoinDate: string;
    companyAddress: string[];
    companyPart: string[];
    companyType: string[];
}

interface UserStore {
    user: UserInfo | null;
    login: (user: UserInfo) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        set => ({
            user: null,
            login: userInfo => set({ user: userInfo }),
            logout: () => set({ user: null }),
        }),
        {
            name: "user-info",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

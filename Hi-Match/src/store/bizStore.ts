import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BizInfo {
    memberID: string;
    memberMail: string;
    memberName: string;
    memberPhone: string;
    memberJoinDate: string;
}

interface BizStore {
    biz: BizInfo | null;
    login: (biz: BizInfo) => void;
    logout: () => void;
}

export const useBizStore = create<BizStore>()(
    persist(
        set => ({
            biz: null,
            login: bizInfo => set({ biz: bizInfo }),
            logout: () => set({ biz: null }),
        }),
        {
            name: "biz-info",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecruitStore {
    selectedPostNo: number | null;
    setSelectedPostNo: (postNo: number) => void;
}

export const useRecruitStore = create<RecruitStore>()(
    persist(
        set => ({
            selectedPostNo: null,
            setSelectedPostNo: postNo => set({ selectedPostNo: postNo }),
        }),
        {
            name: "recruit-post",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

import { create } from "zustand";

interface FindIdInfo {
    memberID: string;
    memberJoinDate: string;
}

interface FindIdStore {
    findId: FindIdInfo[];
    setFindId: (data: FindIdInfo[]) => void;
}

export const useFindIdStore = create<FindIdStore>(set => ({
    findId: [],
    setFindId: data => set({ findId: data }),
}));

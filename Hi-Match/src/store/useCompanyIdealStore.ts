import { create } from "zustand";

type IdealButtonState = "left" | "right" | null;

interface AnalysisDetail {
    title: string;
    detailContent: string[];
}

interface CompanyIdealState {
    selectedButtons: { [key: number]: IdealButtonState };
    analysisDetail: AnalysisDetail[];
    setSelectedButton: (index: number, value: IdealButtonState) => void;
    setAnalysisDetail: (detail: AnalysisDetail[]) => void;
    getIdealCode: () => string;
}

export const useCompanyIdealStore = create<CompanyIdealState>((set, get) => ({
    selectedButtons: {
        0: null,
        1: null,
        2: null,
        3: null,
    },
    analysisDetail: [],
    setSelectedButton: (index, value) =>
        set(state => ({
            selectedButtons: {
                ...state.selectedButtons,
                [index]: value,
            },
        })),
    setAnalysisDetail: detail => set({ analysisDetail: detail }),
    getIdealCode: () => {
        const codeMap = {
            0: { left: "N", right: "F" },
            1: { left: "D", right: "B" },
            2: { left: "C", right: "L" },
            3: { left: "S", right: "O" },
        } as const;

        const { selectedButtons } = get();
        return Object.entries(selectedButtons)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([key, value]) => {
                if (!value) return "";
                return codeMap[Number(key) as keyof typeof codeMap][value];
            })
            .join("");
    },
}));

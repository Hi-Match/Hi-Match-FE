interface PersonalityTestQuestion {
    type?: "A" | "B";
    id?: number;
    question: string;
    checkedValue?: string;
    onChange?: (value: string) => void;
}

interface TestFooterProps {
    page: number;
    setPage: (page: number) => void;
    pagedQuestions: PersonalityTestQuestion[];
    answers: { [idx: number]: string };
    QUESTIONS_PER_PAGE: number;
}

interface PersonalityDetail {
    title: string;
    detailContent: string[];
}

interface PersonalityResult {
    code: string;
    slogan: string;
    description: string;
    rate: {
        n: number;
        f: number;
        d: number;
        b: number;
        c: number;
        l: number;
        s: number;
        o: number;
    };
    detail: PersonalityDetail[];
}

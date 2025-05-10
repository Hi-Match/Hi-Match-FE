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

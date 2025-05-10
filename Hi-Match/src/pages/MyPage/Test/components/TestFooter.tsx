interface TestFooterProps {
    page: number;
    onNextPage: () => void;
    pagedQuestions: PersonalityTestQuestion[];
    answers: { [idx: number]: string };
    QUESTIONS_PER_PAGE: number;
    isLastPage: boolean;
}

const TestFooter = ({
    page,
    onNextPage,
    pagedQuestions,
    answers,
    QUESTIONS_PER_PAGE,
    isLastPage,
}: TestFooterProps) => {
    const isAllAnswered = pagedQuestions.every(
        (_, idx) => answers[page * QUESTIONS_PER_PAGE + idx]
    );

    return (
        <div className="flex justify-end">
            <button
                className={`rounded-md px-6 py-2.5 text-base font-medium text-white transition-colors ${
                    isAllAnswered
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "cursor-not-allowed bg-gray-300"
                }`}
                onClick={onNextPage}
                disabled={!isAllAnswered}
            >
                {isLastPage ? "제출" : "다음"}
            </button>
        </div>
    );
};

export default TestFooter;

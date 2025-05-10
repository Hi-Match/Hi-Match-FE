interface TestFooterProps {
    page: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    pagedQuestions: PersonalityTestQuestion[];
    answers: { [idx: number]: string };
    QUESTIONS_PER_PAGE: number;
    canSubmit: boolean;
    isSubmitting: boolean;
}

const TestFooter = ({
    page,
    onNextPage,
    onPrevPage,
    pagedQuestions,
    answers,
    QUESTIONS_PER_PAGE,
    canSubmit,
    isSubmitting,
}: TestFooterProps) => {
    const isAllAnswered = pagedQuestions.every(
        (_, idx) => answers[page * QUESTIONS_PER_PAGE + idx]
    );

    return (
        <div className="flex justify-end gap-2">
            <button
                className={`rounded-md px-4 py-2 text-white ${
                    page > 0
                        ? "bg-blue-400 hover:bg-blue-500"
                        : "bg-gray02 cursor-not-allowed"
                }`}
                onClick={onPrevPage}
                disabled={page === 0 || isSubmitting}
            >
                이전
            </button>
            <button
                className={`rounded-md px-4 py-2 text-white ${
                    isAllAnswered
                        ? "bg-blue-400 hover:bg-blue-500"
                        : "bg-gray02 cursor-not-allowed"
                } flex items-center gap-2`}
                onClick={onNextPage}
                disabled={!isAllAnswered || isSubmitting}
            >
                {canSubmit ? (
                    isSubmitting ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>제출 중...</span>
                        </>
                    ) : (
                        "제출"
                    )
                ) : (
                    "다음"
                )}
            </button>
        </div>
    );
};

export default TestFooter;

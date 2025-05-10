import TestTable from "./components/TestTable";
import TestFooter from "./components/TestFooter";
import { usePersonalityTest } from "../../../hooks/test/usePersonalityTest";

const Test = () => {
    const {
        type,
        page,
        questions: pagedQuestions,
        answers,
        isLastPage,
        handleAnswerChange,
        handleNextPage,
        handleSubmit,
        QUESTIONS_PER_PAGE,
    } = usePersonalityTest();

    const handleAction = async () => {
        if (isLastPage) {
            try {
                const result = await handleSubmit();
                // TODO: 결과 페이지로 이동
                console.log("검사 결과:", result);
            } catch (error) {
                console.error("제출 실패:", error);
            }
        } else {
            handleNextPage();
        }
    };

    return (
        <div className="mx-auto flex w-full flex-col gap-6 px-15">
            <h2 className="text-3xl font-semibold text-black">인성 검사 🧪</h2>
            <p className="text-gray01 rounded-md bg-[#F5F5F5] px-6 py-4 text-base">
                인성 검사는 회원님과 기업의 매칭을 돕기 위한 검사입니다.
                <br />
                검사는 총 220문항으로 구성되어 있으며, 검사 시간은 약 30분이
                소요됩니다.
            </p>
            <TestTable
                type={type as "A" | "B"}
                page={page}
                pagedQuestions={pagedQuestions}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                QUESTIONS_PER_PAGE={QUESTIONS_PER_PAGE}
            />
            <TestFooter
                page={page}
                onNextPage={handleAction}
                pagedQuestions={pagedQuestions}
                answers={answers}
                QUESTIONS_PER_PAGE={QUESTIONS_PER_PAGE}
                isLastPage={isLastPage}
            />
        </div>
    );
};

export default Test;

import TestHeader from "./TestHeader";
import TestTableRow from "./TestTableRow";

interface TestTableProps {
    type: "A" | "B";
    page: number;
    pagedQuestions: PersonalityTestQuestion[];
    answers: { [idx: number]: string };
    onAnswerChange: (idx: number, value: string) => void;
    QUESTIONS_PER_PAGE: number;
}

const TestTable = ({
    type,
    page,
    pagedQuestions,
    answers,
    onAnswerChange,
    QUESTIONS_PER_PAGE,
}: TestTableProps) => {
    // B형일 때는 번호가 121부터 시작
    const getQuestionNumber = (idx: number) => {
        if (type === "B") {
            return page * QUESTIONS_PER_PAGE + idx + 121;
        }
        return page * QUESTIONS_PER_PAGE + idx + 1;
    };

    return (
        <div>
            <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-md border border-gray-200">
                <TestHeader type={type} />
                <tbody>
                    {pagedQuestions.map((q, idx) => (
                        <TestTableRow
                            key={idx}
                            id={getQuestionNumber(idx)}
                            question={q.question}
                            type={type}
                            checkedValue={
                                answers[getQuestionNumber(idx) - 1] || ""
                            }
                            onChange={value =>
                                onAnswerChange(
                                    getQuestionNumber(idx) - 1,
                                    value
                                )
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestTable;

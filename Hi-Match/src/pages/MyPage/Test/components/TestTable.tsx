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
    const getQuestionNumber = (idx: number) =>
        page * QUESTIONS_PER_PAGE + idx + 1;

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
                                answers[page * QUESTIONS_PER_PAGE + idx] || ""
                            }
                            onChange={value =>
                                onAnswerChange(
                                    page * QUESTIONS_PER_PAGE + idx,
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

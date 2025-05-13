interface JobContentSectionProps {
    postingContent: string;
    postingQuestion: Array<{
        questionNo: number;
        question: string;
        questionLength: number;
    }>;
}
const JobContentSection = ({
    postingContent,
    postingQuestion,
}: JobContentSectionProps) => {
    return (
        <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">💡채용 내용</h3>
                <p className="text-black/80">{postingContent}</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">
                    💡자기소개서 필수 항목
                </h3>
                <ul>
                    {postingQuestion.map(question => (
                        <li
                            className="flex gap-2 rounded-sm border border-gray-200 bg-gray-50 p-4 text-black/80"
                            key={question.questionNo ?? question.question}
                        >
                            ✅
                            <p>
                                {question.question}({question.questionLength}자)
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
export default JobContentSection;

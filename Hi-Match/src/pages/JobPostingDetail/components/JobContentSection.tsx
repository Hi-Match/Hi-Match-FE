import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
    const editor = useEditor({
        extensions: [StarterKit],
        content: postingContent,
        editable: false, // 읽기 전용으로 설정
    });

    return (
        <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">💡채용 내용</h3>
                <div className="prose max-w-none">
                    <EditorContent editor={editor} />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">
                    💡자기소개서 필수 항목
                </h3>
                <ul className="flex flex-col gap-4">
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

import { useState } from "react";
import { applyApplication } from "@/apis/application";
import { toast } from "react-hot-toast";

interface UseApplicationSubmitProps {
    postingNo: number;
    resumeNo: number;
    questions: Array<{
        question: string;
        questionLength: number;
    }>;
    portfolioUrl: string;
}

export const useApplicationSubmit = ({
    postingNo,
    resumeNo,
    questions,
    portfolioUrl,
}: UseApplicationSubmitProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState<string[]>(
        new Array(questions.length).fill("")
    );

    const handleAnswerChange = (index: number, value: string) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const submit = async () => {
        try {
            setIsSubmitting(true);

            // 답변 유효성 검사
            const isValid = answers.every((answer, index) => {
                if (!answer) {
                    toast.error(`${index + 1}번 문항에 답변을 입력해주세요.`);
                    return false;
                }
                if (answer.length > questions[index].questionLength) {
                    toast.error(`${index + 1}번 문항의 답변이 너무 깁니다.`);
                    return false;
                }
                return true;
            });

            if (!isValid) return;

            // API 요청 데이터 구성
            const payload = {
                postingNo,
                resumeNo,
                portfolioUrl,
                question: questions.map((q, index) => ({
                    question: q.question,
                    questionLength: q.questionLength,
                    questionContent: answers[index],
                })),
            };

            await applyApplication(payload);
            toast.success("지원서가 성공적으로 제출되었습니다.");
            return true;
        } catch (error) {
            toast.error("지원서 제출 중 오류가 발생했습니다.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        answers,
        isSubmitting,
        handleAnswerChange,
        submit,
    };
};

import { useEffect, useState } from "react";
import {
    getMemberQuestionListA,
    getMemberQuestionListB,
    postMemberTestResult,
} from "@/apis/code";

const STORAGE_KEY = "personality_test_answers";
const QUESTIONS_PER_PAGE = 10;
const TOTAL_A_QUESTIONS = 120;

export const usePersonalityTest = () => {
    const [questions, setQuestions] = useState<PersonalityTestQuestion[]>([]);
    const [page, setPage] = useState(0);
    const [answers, setAnswers] = useState<{ [idx: number]: string }>(() => {
        const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
        return savedAnswers ? JSON.parse(savedAnswers) : {};
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getMemberQuestionListA();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    const pagedQuestions = questions.slice(
        page * QUESTIONS_PER_PAGE,
        (page + 1) * QUESTIONS_PER_PAGE
    );

    const handleAnswerChange = (idx: number, value: string) => {
        const newAnswers = {
            ...answers,
            [idx]: value,
        };
        setAnswers(newAnswers);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    };

    const isLastPage = () => {
        if (questions.length === TOTAL_A_QUESTIONS) {
            // A형 문제일 때
            return (page + 1) * QUESTIONS_PER_PAGE >= TOTAL_A_QUESTIONS;
        }
        // B형 문제일 때
        return (page + 1) * QUESTIONS_PER_PAGE >= questions.length;
    };

    const handleNextPage = async () => {
        if (
            (page + 1) * QUESTIONS_PER_PAGE >= TOTAL_A_QUESTIONS &&
            questions.length === TOTAL_A_QUESTIONS
        ) {
            // A형 마지막 페이지에서 다음 버튼 클릭 시 B형 문제 가져오기
            const bTypeQuestions = await getMemberQuestionListB();
            setQuestions(bTypeQuestions);
            setPage(0);
        } else {
            setPage(page + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const allQuestions = [
                ...(await getMemberQuestionListA()),
                ...(await getMemberQuestionListB()),
            ];
            const formattedAnswers = Object.entries(answers).map(
                ([idx, response]) => ({
                    question: allQuestions[Number(idx)].question,
                    response,
                })
            );

            const result = await postMemberTestResult(formattedAnswers);
            return result;
        } catch (error) {
            console.error("결과 제출 실패:", error);
            throw error;
        }
    };

    const type = questions.length === TOTAL_A_QUESTIONS ? "A" : "B";

    return {
        type,
        page,
        questions: pagedQuestions,
        answers,
        isLastPage: isLastPage(),
        handleAnswerChange,
        handleNextPage,
        handleSubmit,
        QUESTIONS_PER_PAGE,
    };
};

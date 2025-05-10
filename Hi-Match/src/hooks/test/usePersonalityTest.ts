import { useEffect, useState } from "react";
import {
    getMemberQuestionListA,
    getMemberQuestionListB,
    postMemberTestResult,
} from "@/apis/code";

const STORAGE_KEY = "personality_test_answers";
const QUESTIONS_PER_PAGE = 10;
const TOTAL_A_QUESTIONS = 120;
const TOTAL_B_QUESTIONS = 100;
const TOTAL_QUESTIONS = TOTAL_A_QUESTIONS + TOTAL_B_QUESTIONS;

export const usePersonalityTest = () => {
    const [questions, setQuestions] = useState<PersonalityTestQuestion[]>([]);
    const [page, setPage] = useState(0);
    const [answers, setAnswers] = useState<{ [idx: number]: string }>(() => {
        const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
        return savedAnswers ? JSON.parse(savedAnswers) : {};
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // A형과 B형 문제를 모두 가져옵니다
                const [aTypeQuestions, bTypeQuestions] = await Promise.all([
                    getMemberQuestionListA(),
                    getMemberQuestionListB(),
                ]);

                if (
                    aTypeQuestions.length !== TOTAL_A_QUESTIONS ||
                    bTypeQuestions.length !== TOTAL_B_QUESTIONS
                ) {
                    console.error("문제 개수가 올바르지 않습니다:", {
                        aCount: aTypeQuestions.length,
                        bCount: bTypeQuestions.length,
                    });
                }

                setQuestions([...aTypeQuestions, ...bTypeQuestions]);
            } catch (error) {
                console.error("문제 불러오기 실패:", error);
            }
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
        const maxPage = Math.ceil(TOTAL_QUESTIONS / QUESTIONS_PER_PAGE) - 1;
        return page === maxPage;
    };

    const canSubmit = () => {
        return isLastPage() && Object.keys(answers).length >= TOTAL_QUESTIONS;
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        const maxPage = Math.ceil(TOTAL_QUESTIONS / QUESTIONS_PER_PAGE) - 1;

        if (nextPage <= maxPage) {
            setPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        setPage(Math.max(0, page - 1));
    };

    const handleSubmit = async () => {
        try {
            if (Object.keys(answers).length < TOTAL_QUESTIONS) {
                throw new Error("모든 문제를 풀어야 합니다.");
            }

            const formattedAnswers = Object.entries(answers).map(
                ([idx, response]) => ({
                    question: questions[Number(idx)].question,
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

    const type = page * QUESTIONS_PER_PAGE < TOTAL_A_QUESTIONS ? "A" : "B";

    return {
        type,
        page,
        questions: pagedQuestions,
        answers,
        isLastPage: isLastPage(),
        canSubmit: canSubmit(),
        handleAnswerChange,
        handleNextPage,
        handlePrevPage,
        handleSubmit,
        QUESTIONS_PER_PAGE,
    };
};

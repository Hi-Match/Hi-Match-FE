import Modal from "@/components/Modal";
import { useUserStore } from "@/store/userStore";
import { useApplicationSubmit } from "@/hooks/application/useApplicationSubmit";
import { useResumeList } from "@/hooks/application/useResumeList";
import JobPostingResumeCardList from "./JobPostingResumeCardList";
import PortfolioInput from "@/pages/MyPage/Resume/components/ResumeWrite/Input/PortfolioInput";
import { useState } from "react";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    postingTitle: string; // 공고 제목
    companyName: string; // 회사명
    postingNo: number;
    questions: Array<{
        question: string;
        questionLength: number;
    }>;
}

const ApplicationModal = ({
    isOpen,
    onClose,
    postingTitle,
    companyName,
    postingNo,
    questions,
}: ApplicationModalProps) => {
    const { user } = useUserStore();
    const { resumes, isLoading, selectedResumeNo, setSelectedResumeNo } =
        useResumeList();
    const [portfolioUrl, setPortfolioUrl] = useState<string>("");

    const { answers, isSubmitting, handleAnswerChange, submit } =
        useApplicationSubmit({
            postingNo,
            resumeNo: selectedResumeNo ?? 0,
            questions,
            portfolioUrl,
        });

    const handleSubmit = async () => {
        const success = await submit();
        if (success) {
            onClose();
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    로딩중...
                </div>
            ) : (
                <Modal
                    isOpen={isOpen}
                    title="지원하기"
                    buttonText={isSubmitting ? "제출 중..." : "지원하기"}
                    buttonEnabled={!isSubmitting}
                    onClose={onClose}
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-6">
                        {/* 공고 정보 */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h4 className="font-medium text-gray-900">
                                {companyName}
                            </h4>
                            <p className="mt-1 text-gray-600">{postingTitle}</p>
                        </div>

                        {/* 지원자 정보 */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">
                                지원자 정보
                            </h4>
                            <dl className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">이름</dt>
                                    <dd className="font-medium text-gray-900">
                                        {user?.memberName}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">이메일</dt>
                                    <dd className="font-medium text-gray-900">
                                        {user?.memberMail}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">전화번호</dt>
                                    <dd className="font-medium text-gray-900">
                                        {JSON.parse(
                                            atob(user?.memberPhone ?? "")
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* 이력서 선택 영역 */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">
                                이력서 선택
                            </h4>
                            <JobPostingResumeCardList
                                selectedResumeNo={selectedResumeNo}
                                onSelect={setSelectedResumeNo}
                            />
                        </div>

                        <div className="user_portfolio space-y-2">
                            <h4 className="text-lg font-medium text-black">
                                포트폴리오
                            </h4>
                            <PortfolioInput
                                onChange={url => setPortfolioUrl(url)}
                            />
                        </div>

                        {/* 질문 답변 영역 */}
                        <div className="space-y-6">
                            {questions.map((question, index) => (
                                <div key={index} className="space-y-2">
                                    <h4 className="text-lg font-medium text-black">
                                        자기소개서 항목
                                    </h4>
                                    <label className="block font-medium text-gray-900">
                                        {index + 1}. {question.question}
                                    </label>
                                    <textarea
                                        value={answers[index]}
                                        onChange={e =>
                                            handleAnswerChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        maxLength={question.questionLength}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                        rows={4}
                                    />
                                    <p className="text-right text-sm text-gray-500">
                                        {answers[index].length} /{" "}
                                        {question.questionLength}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ApplicationModal;

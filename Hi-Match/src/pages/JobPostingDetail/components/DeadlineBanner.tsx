import { formatDeadline } from "@/utils/dateFormat";
import { useState } from "react";
import ApplicationModal from "./ApplicationModal";

interface DeadlineBannerProps {
    deadline: string;
    postingTitle: string;
    companyName: string;
    postingNo: number;
    questions: Array<{
        question: string;
        questionLength: number;
    }>;
}

const DeadlineBanner = ({
    deadline,
    postingTitle,
    companyName,
    postingNo,
    questions,
}: DeadlineBannerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasToken = Boolean(sessionStorage.getItem("accessToken"));

    return (
        <div>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">마감일</h2>
                <p className="text-lg font-normal text-blue-500">
                    {formatDeadline(deadline)} 까지
                </p>
                <button
                    className={`mt-8 w-full rounded-md py-3 text-center text-xl font-medium transition-colors ${
                        hasToken
                            ? "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                            : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                    onClick={() => hasToken && setIsModalOpen(true)}
                    disabled={!hasToken}
                >
                    {hasToken ? "지원하기" : "로그인 후 지원 가능"}
                </button>
            </div>

            {isModalOpen && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    postingTitle={postingTitle}
                    companyName={companyName}
                    postingNo={postingNo}
                    questions={questions}
                />
            )}
        </div>
    );
};

export default DeadlineBanner;

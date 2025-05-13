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

    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">마감일</h2>
                <p className="text-lg font-normal text-blue-500">
                    {formatDeadline(deadline)} 까지
                </p>
                <button
                    className="mt-8 w-full cursor-pointer rounded-md bg-blue-500 py-3 text-center text-xl font-medium text-white transition-colors hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    지원하기
                </button>
            </div>

            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                postingTitle={postingTitle}
                companyName={companyName}
                postingNo={postingNo}
                questions={questions}
            />
        </>
    );
};

export default DeadlineBanner;

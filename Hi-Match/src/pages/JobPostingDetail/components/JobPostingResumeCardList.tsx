import { useResumeList } from "@/hooks/application/useResumeList";
import { formatDate } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";

interface JobPostingResumeCardListProps {
    selectedResumeNo: number | null;
    onSelect: (resumeNo: number) => void;
}

const JobPostingResumeCardList = ({
    selectedResumeNo,
    onSelect,
}: JobPostingResumeCardListProps) => {
    const navigate = useNavigate();
    const { resumes, isLoading } = useResumeList();

    if (isLoading) {
        return (
            <p className="text-center text-gray-500">
                이력서 목록을 불러오는 중...
            </p>
        );
    }

    if (!resumes?.length) {
        return (
            <div className="text-center">
                <button
                    onClick={() => navigate("/mypage/resume/write")}
                    className="grid-center hover:[&>svg]:fill-gray02 hover:[&>p]:text-gray01 h-30 w-50 cursor-pointer space-y-2.5 rounded-[10px] border-2 border-solid border-gray-100 bg-white transition-all duration-300 hover:bg-gray-50"
                >
                    <p className="text-gray02 text-md font-medium transition-all duration-300">
                        새 이력서 작성하기
                    </p>
                    <PlusIcon className="h-6 w-6 fill-gray-300 transition-all duration-300" />
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {resumes.map(resume => (
                <div
                    key={resume.resumeNo}
                    onClick={() => onSelect(resume.resumeNo)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedResumeNo === resume.resumeNo
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <h3 className="font-medium text-gray-900">
                        {resume.resumeTitle}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        작성일: {formatDate(resume.resumeDate)}
                    </p>
                </div>
            ))}
            {/* 안내 메시지 */}
            <p className="text-center text-sm text-gray-600">
                위 정보로 지원하시겠습니까?
            </p>
        </div>
    );
};

export default JobPostingResumeCardList;

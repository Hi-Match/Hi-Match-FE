import { formatDate } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";

interface Resume {
    resumeNo: number;
    resumeTitle: string;
    resumeDate: string;
}

interface ResumeListProps {
    resumeList: Resume[];
}

const ResumeList = ({ resumeList }: ResumeListProps) => {
    const navigate = useNavigate();

    const handleClickResume = () => {
        navigate("/mypage/resume");
    };

    const handleClickResumeDetail = (resumeNo: number) => {
        navigate(`/mypage/resume/${resumeNo}`);
    };

    return (
        <div className="resume_list space-y-7.5">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black">이력서</h3>
                <span
                    className="flex cursor-pointer items-center"
                    onClick={handleClickResume}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            <ul className="resume_list flex items-center space-x-6">
                {resumeList.map(({ resumeNo, resumeTitle, resumeDate }) => (
                    <li
                        key={resumeNo}
                        className="resume hover: bg-gray-[#FCFCFC] flex h-50 w-75 cursor-pointer flex-col justify-between rounded-[10px] border border-[#F7F8F9] p-7.5 transition-all duration-300 ease-in-out hover:shadow-md shadow-sm"
                        onClick={() => handleClickResumeDetail(resumeNo)}
                    >
                        <p className="resume_title text-xl font-medium text-black">
                            {resumeTitle}
                        </p>
                        <span className="text-gray01 resume_date text-sm">
                            최종 작성 {formatDate(resumeDate)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeList;

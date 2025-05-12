import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";

interface ApplicationCurrent {
    total: number;
    submit: number;
    progress: number;
    resumePass: number;
    finalPass: number;
    fail: number;
}

interface ApplicationListProps {
    application: ApplicationCurrent[];
}

const ApplicationList = ({ application }: ApplicationListProps) => {
    return (
        <div className="application">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">지원 현황</h3>
                <span
                    className="flex cursor-pointer items-center"
                    // onClick={handleClickResume}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    );
};

export default ApplicationList;

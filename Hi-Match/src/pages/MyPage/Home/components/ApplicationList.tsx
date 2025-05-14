import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";
import { useNavigate } from "react-router-dom";

interface ApplicationCurrent {
    total: number;
    submit: number;
    progress: number;
    resumePass: number;
    finalPass: number;
    fail: number;
    [key: string]: number;
}

interface ApplicationListProps {
    application: ApplicationCurrent;
}

const ApplicationList = ({ application }: ApplicationListProps) => {
    const navigate = useNavigate();
    const keysToKeep = [
        "submit",
        "progress",
        "resumePass",
        "finalPass",
        "fail",
    ];

    const keyValueMap = [
        { key: "total", label: "전체" },
        { key: "submit", label: "지원 완료" },
        { key: "progress", label: "서류 검토중" },
        { key: "resumePass", label: "서류 합격" },
        { key: "finalPass", label: "최종 합격" },
        { key: "fail", label: "불합격" },
    ];

    const handleClickApplication = () => {
        navigate("/mypage/application");
    };

    const filteredApplication = Object.keys(application)
        .filter(key => keysToKeep.includes(key))
        .reduce((obj, key) => {
            obj[key] = application[key];
            return obj;
        }, {} as ApplicationCurrent);

    return (
        <div className="application flex flex-col gap-4">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black">지원 현황</h3>
                <span
                    className="flex cursor-pointer items-center"
                    onClick={handleClickApplication}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            <ul className="resume_list flex items-center space-x-6">
                {Object.entries(filteredApplication).map(([key, value]) => {
                    const mapping = keyValueMap.find(
                        item => item.key.toUpperCase() === key.toUpperCase()
                    );
                    const displayLabel = mapping ? mapping.label : key;
                    return (
                        <li
                            key={key}
                            className="resume hover: flex h-40 w-75 cursor-pointer flex-col justify-around gap-4 rounded-[10px] border border-[#F4F4F4] bg-white px-4 py-2 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
                        >
                            <p className="resume_title text-lg text-black/80">
                                {displayLabel}
                            </p>
                            <span className="text-4xl text-center text-black/70 py-4 pb-8">
                                {value}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ApplicationList;

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
    const keysToKeep = ["submit", "progress", "resumePass", "finalPass","fail"];

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

    let filteredApplication = Object.keys(application)
        .filter(key => keysToKeep.includes(key))
        .reduce((obj, key) => {
            obj[key] = application[key];
            return obj;
        }, {} as ApplicationCurrent);

    return (
        <div className="application">
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
                            className="resume hover: flex h-50 w-75 cursor-pointer flex-col justify-between rounded-[10px] border-2 border-solid border-blue-100 bg-white p-7.5 transition-all duration-300 ease-in-out hover:shadow-md"
                        >
                            <p className="resume_title text-lg text-black font-black">
                                {displayLabel}
                            </p>
                            <div className="text-center">
                            <span className="text-gray01 text-7xl">
                                {value}
                            </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ApplicationList;

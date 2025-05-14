import { formatDateMD } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";

interface ApplicantCardProps {
    applicantNo: number;
    applicantName: string;
    applicantDate: string;
    applicantGrade: number | null;
    applicantPart: string;
}

const ApplicantCard = ({
    applicantNo,
    applicantName,
    applicantDate,
    applicantGrade,
    applicantPart,
}: ApplicantCardProps) => {
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`/company/applicant/resume/${applicantNo}`);
    };

    return (
        <div
            className="applicant_card cursor-pointer space-y-5 rounded-[10px] border border-solid border-gray-50 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg"
            onClick={handleClickCard}
        >
            <div className="flex items-center justify-between">
                <p className="font-semibold text-black">{applicantName}</p>
                {applicantGrade && (
                    <p className="rounded-2xl bg-blue-500 px-2.5 py-1 text-sm font-medium text-white">
                        {applicantGrade}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <p className="font-medium text-blue-500">{applicantPart}</p>
                <p className="text-gray01 text-sm">
                    {formatDateMD(applicantDate)}
                </p>
            </div>
        </div>
    );
};

export default ApplicantCard;

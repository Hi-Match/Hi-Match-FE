import { formatDate } from "@/utils/dateFormat";

interface ResumeCardProps {
    resumeNo: number;
    resumeTitle: string;
    resumeDate: string;
    isSelected: boolean;
    onClick: () => void;
}

const ResumeCard = ({
    resumeTitle,
    resumeDate,
    isSelected,
    onClick,
}: ResumeCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded-lg border p-4 transition-all ${
                isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
            }`}
        >
            <h3 className="font-medium text-gray-900">{resumeTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">
                작성일: {formatDate(resumeDate)}
            </p>
        </div>
    );
};

export default ResumeCard;

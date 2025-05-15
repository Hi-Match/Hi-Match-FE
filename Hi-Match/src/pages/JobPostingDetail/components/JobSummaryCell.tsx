import { twMerge } from "tailwind-merge";

interface JobSummaryCellProps {
    className?: string;
    title: string;
    content: string;
}

const JobSummaryCell = ({ className, title, content }: JobSummaryCellProps) => {
    return (
        <li className={twMerge("flex w-1/2 gap-2 py-1", className)}>
            <span className="w-20 shrink-0 font-normal text-gray-500">
                {title}
            </span>
            <span className="break-keep">{content}</span>
        </li>
    );
};

export default JobSummaryCell;

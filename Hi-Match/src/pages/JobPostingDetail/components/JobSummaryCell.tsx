const JobSummaryCell = ({ title, content }: { title: string; content: string }) => {
    return (
        <li className="flex gap-2 w-1/2 py-1">
            <span className="text-gray-500 font-normal w-30">{title}</span>
            <span>{content}</span>
        </li>
    );
};

export default JobSummaryCell;

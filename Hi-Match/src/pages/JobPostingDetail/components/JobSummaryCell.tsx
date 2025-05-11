const JobSummaryCell = ({ title, content }: { title: string; content: string }) => {
    return (
        <li>
            <span>{title}</span>
            <span>{content}</span>
        </li>
    );
};

export default JobSummaryCell;

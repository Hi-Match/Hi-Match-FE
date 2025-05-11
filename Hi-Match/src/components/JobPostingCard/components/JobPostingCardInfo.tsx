const JobPostingCardInfo = ({
    title,
    company,
    location,
    education,
    companyType,
}: JobPostingCardProps) => {
    return (
        <div>
            <div className="text-lg font-bold">{title}</div>
            <div className="text-sm text-gray-700">{company}</div>
            <div className="mt-1 text-xs text-gray-500">
                {location} | {education} · {companyType}
            </div>
        </div>
    );
};

export default JobPostingCardInfo;

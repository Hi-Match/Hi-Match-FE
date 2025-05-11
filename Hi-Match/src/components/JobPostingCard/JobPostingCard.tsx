import JobPostingCardInfo from "./components/JobPostingCardInfo";
import JobPostingCardImage from "./components/JobPostingCardImage";

const JobPostingCard = ({
    imageUrl,
    deadline,
    isBookmarked,
    title,
    company,
    location,
    education,
    companyType,
}: JobPostingCardProps) => (
    <div className="ratio-[3/4] flex cursor-pointer flex-col gap-4 overflow-hidden transition-all duration-300 hover:scale-105">
        <JobPostingCardImage
            imageUrl={imageUrl}
            deadline={deadline}
            isBookmarked={isBookmarked}
            title={title}
        />
        <JobPostingCardInfo
            title={title}
            company={company}
            location={location}
            education={education}
            companyType={companyType}
        />
    </div>
);

export default JobPostingCard;

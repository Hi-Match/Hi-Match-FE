import JobPostingCardInfo from "./components/JobPostingCardInfo";
import JobPostingCardImage from "./components/JobPostingCardImage";
import { useNavigate } from "react-router-dom";

const JobPostingCard = ({
    imageUrl,
    deadline,
    isBookmarked,
    title,
    company,
    location,
    education,
    companyType,
    postingNo,
    bookMarkNo,
}: JobPostingCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/jobs/${postingNo}`);
    };

    return (
        <div
            className="flex flex-shrink-0 cursor-pointer flex-col gap-4 overflow-hidden transition-all duration-300 hover:scale-105"
            onClick={handleClick}
        >
            <JobPostingCardImage
                imageUrl={imageUrl}
                deadline={deadline}
                isBookmarked={isBookmarked}
                title={title}
                postingNo={postingNo}
                bookMarkNo={bookMarkNo}
            />
            <JobPostingCardInfo
                title={title}
                company={company}
                location={location}
                education={education}
                companyType={companyType}
                postingNo={postingNo}
                bookMarkNo={bookMarkNo}
            />
        </div>
    );
};

export default JobPostingCard;

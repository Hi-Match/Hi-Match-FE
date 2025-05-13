import DdayBadge from "./DdayBadge";
import ScrapButton from "./ScrapButton";

const JobPostingCardImage = ({
    imageUrl,
    isBookmarked,
    title,
    deadline,
}: JobPostingCardProps) => {
    return (
        <div className="relative max-h-[200px] w-full">
            <img
                src={imageUrl ?? "https://i.pinimg.com/736x/9c/50/83/9c50837ea495768f01a2e78dc98bf4e2.jpg"}
                alt={title}
                draggable={false}
                className="ratio-[3/4] h-full w-full rounded-xl object-cover shadow-sm drag-none"
            />
            <DdayBadge deadline={deadline ?? ""} />
            <ScrapButton isBookmarked={isBookmarked ?? false} onClick={() => {}} />
        </div>
    );
};

export default JobPostingCardImage;

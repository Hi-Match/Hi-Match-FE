import DdayBadge from "./DdayBadge";
import ScrapButton from "./ScrapButton";

const JobPostingCardImage = ({
    imageUrl,
    title,
    deadline,
    postingNo,
    bookMarkNo,
}: JobPostingCardProps) => {
    return (
        <div className="relative max-h-[200px] w-full">
            <img
                src={
                    imageUrl ??
                    "https://i.pinimg.com/736x/9c/50/83/9c50837ea495768f01a2e78dc98bf4e2.jpg"
                }
                alt={title}
                draggable={false}
                className="aspect-[3/4] drag-none h-full w-full rounded-xl object-cover shadow-sm"
            />
            <DdayBadge deadline={deadline ?? ""} />
            <ScrapButton bookMarkNo={bookMarkNo} postingNo={postingNo} />
        </div>
    );
};

export default JobPostingCardImage;

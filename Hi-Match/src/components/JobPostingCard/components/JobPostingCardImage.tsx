import DdayBadge from "./DdayBadge";
import ScrapButton from "./ScrapButton";
import defaultJobPosting from "@/assets/images/default-jobposting.png";

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
                src={imageUrl ?? defaultJobPosting}
                alt={title}
                draggable={false}
                className="drag-none aspect-[3/4] h-full w-full rounded-xl object-cover shadow-sm"
            />
            <DdayBadge deadline={deadline ?? ""} />
            <ScrapButton bookMarkNo={bookMarkNo} postingNo={postingNo} />
        </div>
    );
};

export default JobPostingCardImage;

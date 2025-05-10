import DdayBadge from "./DdayBadge";

const BookmarkImage = ({
    imageUrl,
    isBookmarked,
    title,
    deadline,
}: BookmarkCardProps) => {
    return (
        <div className="relative max-h-[200px] w-full">
            <img
                src={imageUrl}
                alt={title}
                draggable={false}
                className="ratio-[3/4] h-full w-full rounded-xl object-cover shadow-sm drag-none"
            />
            <DdayBadge deadline={deadline ?? ""} />
            <button className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-black/40 text-2xl text-white/80">
                {/* 별 아이콘 (채워짐/비어있음) */}
                {isBookmarked ? "★" : "☆"}
            </button>
        </div>
    );
};

export default BookmarkImage;

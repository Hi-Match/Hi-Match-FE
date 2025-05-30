import DdayBadge from "./DdayBadge";
import { useNavigate } from "react-router-dom";
import { useBookmarkDelete } from "../../../../hooks/bookmark/useBookmarkListDelete";
import defaultJobPosting from "@/assets/images/default-jobposting.png";

interface BookmarkCardProps {
    bookMarkNo?: number;
    postingNo: number;
    imageUrl: string;
    isBookmarked: boolean;
    title: string;
    deadline?: string | null;
    showBookmarkButton?: boolean;
}

const BookmarkImage = ({
    bookMarkNo,
    postingNo,
    imageUrl,
    isBookmarked,
    title,
    deadline,
    showBookmarkButton = true,
}: BookmarkCardProps) => {
    const { handleDelete } = useBookmarkDelete();
    const navigate = useNavigate();

    const handleClickBookmark = () => {
        navigate(`/jobs/${postingNo}`);
    };

    const handleClick = () => {
        if (bookMarkNo) {
            handleDelete(bookMarkNo);
        } else {
            console.warn("북마크 번호가 없습니다.");
        }
    };
    return (
        <div className="relative max-h-[200px] w-full">
            <img
                onClick={handleClickBookmark}
                src={imageUrl ?? defaultJobPosting}
                alt={title}
                draggable={false}
                className="drag-none aspect-[3/4] h-full w-full rounded-xl object-cover shadow-sm"
            />
            <DdayBadge deadline={deadline ?? ""} />
            {showBookmarkButton && (
                <button
                    onClick={handleClick}
                    className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-black/40 text-xl text-white/80"
                >
                    {/* 별 아이콘 (채워짐/비어있음) */}
                    {isBookmarked ? "★" : "☆"}
                </button>
            )}
        </div>
    );
};

export default BookmarkImage;

import DdayBadge from "./DdayBadge";
import { useNavigate } from "react-router-dom";
import { useBookmarkDelete } from "../../../../hooks/bookmark/useBookmarkListDelete";

const BookmarkImage = ({
    bookMarkNo,
    postingNo,  //TODO : 추후 이미지 클릭시 공고 상세 설명으로 이동하기 위한 데이터 입니다.
    imageUrl,
    isBookmarked,
    title,
    deadline,
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
                src={imageUrl}
                alt={title}
                draggable={false}
                className="ratio-[3/4] h-full w-full rounded-xl object-cover shadow-sm drag-none"
            />
            <DdayBadge deadline={deadline ?? ""} />
            <button onClick={handleClick} 
            className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-black/40 text-xl text-white/80">
                {/* 별 아이콘 (채워짐/비어있음) */}
                {isBookmarked ? "★" : "☆"}
            </button>
        </div>
    );
};

export default BookmarkImage;

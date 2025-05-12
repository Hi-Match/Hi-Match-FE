import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";
import { useNavigate } from "react-router-dom";
import BookmarkCardList from "@/pages/MyPage/Bookmark/components/BookmarkCardList";

interface BookmarkListProps {
  bookmarkList: Bookmark[];
}

const BookmarkList = ({ bookmarkList }: BookmarkListProps) => {
    const navigate = useNavigate();

    const handleClickBookmark = () => {
        navigate("/mypage/bookmark");
    };
    
    return (
        <div className="bookmark_list">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black">
                    회원님이 북마크한 공고
                </h3>
                <span
                    className="flex cursor-pointer items-center"
                    onClick={handleClickBookmark}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
                <BookmarkCardList bookmarks={bookmarkList} />
        </div>
    );
};
export default BookmarkList;

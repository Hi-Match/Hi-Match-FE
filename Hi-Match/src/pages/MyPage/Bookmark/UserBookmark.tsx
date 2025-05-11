import BookmarkCardList from "./components/BookmarkCardList";
import { useBookmarkSearch } from "../../../hooks/bookmark/useBookmarkListSearch";

const UserBookmark = () => {
    const {bookmarks} = useBookmarkSearch();


    return (
        <div className="mx-auto flex w-full flex-col gap-14 px-24">
            <h2 className="text-3xl font-semibold text-black">
                회원님이 스크랩한 공고 💻
            </h2>
            <BookmarkCardList bookmarks={bookmarks} />
        </div>
    );
};

export default UserBookmark;

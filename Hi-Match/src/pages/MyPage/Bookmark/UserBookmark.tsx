import BookmarkCardList from "./components/BookmarkCardList";
import { useBookmarkSearch } from "../../../hooks/bookmark/useBookmarkListSearch";
import { useBookmarkMaxPage } from "../../../hooks/bookmark/useBookmarkMaxPage";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";

const UserBookmark = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {bookmarks} = useBookmarkSearch(currentPage);
    const {totalPages} = useBookmarkMaxPage();

    return (
        <div className="mx-auto flex w-full flex-col gap-14 px-24">
            <h2 className="text-3xl font-semibold text-black">
                회원님이 스크랩한 공고 💻
            </h2>

            <BookmarkCardList bookmarks={bookmarks} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default UserBookmark;

import BookmarkCardList from "./components/BookmarkCardList";
import { useBookmarkSearch } from "../../../hooks/bookmark/useBookmarkListSearch";
import { useBookmarkMaxPage } from "../../../hooks/bookmark/useBookmarkMaxPage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "../Application/components/SearchBar";
import { useState } from "react";

const UserBookmark = () => {
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { bookmarks } = useBookmarkSearch(currentPage, keyword);
    let { totalPages } = useBookmarkMaxPage(keyword);
    if (totalPages === 0) totalPages++;

    return (
        <div className="mx-auto flex w-full flex-col gap-14 px-24">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-black">
                    회원님이 스크랩한 공고 💻
                </h2>
                <div className="flex">
                    <SearchBar onSearch={setKeyword} />
                </div>
            </div>
            <BookmarkCardList
                bookmarks={bookmarks}
                showBookmarkButton={true}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default UserBookmark;

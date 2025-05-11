import BookmarkCard from "./BookmarkCard";

const BookmarkCardList = ({ bookmarks }: { bookmarks: Bookmark[] }) => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookmarks.map(bookmark => (
            <BookmarkCard
                key={bookmark.bookMarkNo}
                bookMarkNo={bookmark.bookMarkNo}
                postingNo={bookmark.postingNo}
                imageUrl={bookmark.companyImgA}
                deadline={bookmark.postingDeadLine}
                isBookmarked={true}
                title={bookmark.postingTitle}
                company={bookmark.companyName}
                location={bookmark.companyAddress}
                education={bookmark.postingEducation}
                companyType={bookmark.companyType}
            />
        ))}
    </div>
);

export default BookmarkCardList;

import BookmarkCardInfo from "./BookmarkCardInfo";
import BookmarkImage from "./BookmarkImage";

const BookmarkCard = ({
    bookMarkNo,
    postingNo,
    imageUrl,
    deadline,
    isBookmarked,
    title,
    company,
    location,
    education,
    companyType,
    showBookmarkButton = true,
}: BookmarkCardProps) => (
    <div className="ratio-[3/4] overflow-hidden flex flex-col gap-4 cursor-pointer hover:scale-105 transition-all duration-300">
        <BookmarkImage
            bookMarkNo={bookMarkNo}
            postingNo={postingNo}
            imageUrl={imageUrl}
            deadline={deadline}
            isBookmarked={isBookmarked}
            title={title}
            showBookmarkButton={showBookmarkButton}
        />
        <BookmarkCardInfo
            title={title}
            company={company}
            location={location}
            education={education}
            companyType={companyType}
        />
    </div>
);

export default BookmarkCard;

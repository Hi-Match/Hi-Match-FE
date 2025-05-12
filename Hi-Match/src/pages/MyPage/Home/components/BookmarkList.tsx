import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";

interface Bookmark {
    bookMarkNo: number;
    postingNo: number;
    companyName: string;
    postingTitle: string;
    companyAddress: string;
    postingEducation: string;
    postingDeadLine: string;
}

interface BookmarkListProps {
    bookmarkList: Bookmark[];
}

const BookmarkList = ({ bookmarkList }: BookmarkListProps) => {
    return (
        <div className="bookmark_list">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
                    회원님이 북마크한 공고
                </h3>
                <span
                    className="flex cursor-pointer items-center"
                    // onClick={handleClickResume}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            <ul className="bookmark">
                <li></li>
            </ul>
        </div>
    );
};
export default BookmarkList;

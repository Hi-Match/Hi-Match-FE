import BookmarkCardList from "./components/BookmarkCardList";

const UserBookmark = () => {
    const bookmarks: Bookmark[] = [
        {
            bookMarkNo: 1,
            postingNo: 3,
            companyImage:
                "https://i.pinimg.com/736x/41/45/7d/41457dc312273e1b1e9181cacbf907cb.jpg",
            companyName: "팀네이버",
            postingTitle: "팀네이버에서 함께할 백엔드 개발자 모집합니다",
            companyAddress: "경기도 분당시 서초구 봉은사로 1길 5",
            postingEducation: "대졸",
            companyType: "계약직",
            postingDeadLine: "20250507T123456",
        },
        {
            bookMarkNo: 1,
            postingNo: 3,
            companyImage:
                "https://i.pinimg.com/736x/41/45/7d/41457dc312273e1b1e9181cacbf907cb.jpg",
            companyName: "팀네이버",
            postingTitle: "팀네이버에서 함께할 백엔드 개발자 모집합니다",
            companyAddress: "경기도 분당시 서초구 봉은사로 1길 5",
            postingEducation: "대졸",
            companyType: "계약직",
            postingDeadLine: "20250507T123456",
        },
        {
            bookMarkNo: 1,
            postingNo: 3,
            companyImage:
                "https://i.pinimg.com/736x/41/45/7d/41457dc312273e1b1e9181cacbf907cb.jpg",
            companyName: "팀네이버",
            postingTitle: "팀네이버에서 함께할 백엔드 개발자 모집합니다",
            companyAddress: "경기도 분당시 서초구 봉은사로 1길 5",
            postingEducation: "대졸",
            companyType: "계약직",
            postingDeadLine: "20250507T123456",
        },
        {
            bookMarkNo: 1,
            postingNo: 3,
            companyImage:
                "https://i.pinimg.com/736x/41/45/7d/41457dc312273e1b1e9181cacbf907cb.jpg",
            companyName: "팀네이버",
            postingTitle: "팀네이버에서 함께할 백엔드 개발자 모집합니다",
            companyAddress: "경기도 분당시 서초구 봉은사로 1길 5",
            postingEducation: "대졸",
            companyType: "계약직",
            postingDeadLine: "20250507T123456",
        },
    ];

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

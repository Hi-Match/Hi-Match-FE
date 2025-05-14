interface BookmarkCardProps {
    bookMarkNo: number;
    postingNo: number;
    imageUrl: string;
    isBookmarked: boolean;
    title: string;
    company: string;
    location: string;
    education: string;
    companyType: string;
    deadline?: string | null;
    showBookmarkButton: boolean;
}

interface Bookmark {
    bookMarkNo: number;
    postingNo: number;
    companyImgA: string;
    companyName: string;
    companyType: string;
    postingTitle: string;
    companyAddress: string;
    postingEducation: string;
    postingDeadLine: string;
    showBookmarkButton?: boolean;
}

interface BookmarkImageProps {
    bookMarkNo?: number;
    postingNo?: number;
    imageUrl?: string;
    isBookmarked?: boolean;
    title?: string;
    deadline?: string | null;
    showBookmarkButton?: boolean;
}

interface BookmarkCardInfoProps {
    title: string;
    company: string;
    location: string;
    education: string;
    companyType: string;
}

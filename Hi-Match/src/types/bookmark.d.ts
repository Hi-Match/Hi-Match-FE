interface BookmarkCardProps {
    bookMarkNo?: number;
    postingNo?: number;
    imageUrl?: string;
    deadline?: string;
    isBookmarked?: boolean;
    title?: string;
    company?: string;
    location?: string;
    education?: string;
    companyType?: string;
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
}

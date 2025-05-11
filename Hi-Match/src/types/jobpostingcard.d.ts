interface JobPostingCardProps {
    imageUrl?: string;
    deadline?: string;
    isBookmarked?: boolean;
    title?: string;
    company?: string;
    location?: string;
    education?: string;
    companyType?: string;
    postingNo?: number;
}

interface JobPosting {
    postingNo: number;
    bookMarkNo: number | null;
    companyName: string;
    postingTitle: string;
    companyAddress: string | null;
    companyType: string;
    postingEducation: string;
    companyImgA?: string | null;
    postingDeadLine: string;
}

interface JobPostingParams {
    companyAddress?: string[];
    companyPart?: string[];
    companyType?: string[];
    postingEducation?: string[];
    keyword?: string;
    page: number;
}

interface JobPostingDetail {
    companyName: string;
    postingTitle: string;
    companyImgA?: string;
    companyImgB?: string;
    companyImgC?: string;
    postingContent: string;
    postingPart: string;
    postingSal: number;
    postingExperience: string;
    postingEducation: string;
    postingLocation: string;
    postingType: string;
    postingWorkType: string;
    postingWorkStartTime: string;
    postingWorkEndTime: string;
    postingIsFinish: boolean;
    postingDeadLine: string;
    postingQuestion: Array<{
        questionNo: number;
        question: string;
        questionLength: number;
    }>;
}

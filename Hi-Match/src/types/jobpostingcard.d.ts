interface JobPostingCardProps {
    imageUrl?: string;
    deadline?: string;
    isBookmarked?: boolean;
    title?: string;
    company?: string;
    location?: string;
    education?: string;
    companyType?: string;
    postingNo: number;
    bookMarkNo: number | null;
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

interface CompanyInfo {
    companyName: string;
    companyManagerName: string;
    companyAddress: string;
    companyPhone: string;
    companyMail: string;
    companyIndustry: string;
    companyEmployee: string;
    companyDescription: string;
    companyLogo: string;
    companyImgA?: string;
    companyImgB?: string;
    companyImgC?: string;
    companyURL: string;
    tag: Array<{
        tagName: string;
    }>;
    img: Array<{
        imgName: string;
    }>;
}

interface AIAnalysisCardProps {
    detail: { title: string; detailContent: string[] }[];
}

interface JobPostingCardProps {
    imageUrl?: string;
    deadline?: string;
    isBookmarked?: boolean;
    title?: string;
    company?: string;
    location?: string;
    education?: string;
    companyType?: string;
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

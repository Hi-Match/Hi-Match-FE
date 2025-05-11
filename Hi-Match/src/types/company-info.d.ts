// 기업 정보 관리
interface CompanyInfo {
    companyLogo: string;
    companyImgA: string;
    companyImgB: string;
    companyImgC: string;
    companyName: string; // 기업명
    companyManagerName: string;
    companyAddress: string;
    companyPhone: string;
    companyMail: string;
    companyIndustry: string;
    companyEmployee: string;
    companyURL: string;
    companyDescription: string; // 기업 소개
    tag?: CompanyTag[];
}

interface CompanyTag {
    tagName: string;
}

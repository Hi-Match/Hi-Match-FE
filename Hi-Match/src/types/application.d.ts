interface ApplicationSearchParams {
    category: "TOTAL";
    keyword: string;
    page: number;
}

interface ApplicationResponse {
    maxPage: number;
    list: Array<{
        applicationNo: number;
        applicationName: string;
        applicationPart: string;
        applicationContract: string;
        applicationDate: string;
        applicationStatus:
            | "TOTAL"
            | "SUBMIT"
            | "PROGRESS"
            | "RESUME_PASS"
            | "FINAL_PASS"
            | "FAIL";
    }>;
}

interface ApplicationItem {
    applicationNo: number;
    applicationName: string;
    applicationPart: string;
    applicationContract: string;
    applicationDate: string;
    applicationStatus:
        | "TOTAL"
        | "SUBMIT"
        | "PROGRESS"
        | "RESUME_PASS"
        | "FINAL_PASS"
        | "FAIL";
}

// 지원자 전체 목록/접수 완료 목록 API 응답 타입
// (API 응답이 배열 형태이므로 아래와 같이 정의)

type ApplicationListResponse = ApplicationItem[];

interface AppIndexProps {
    indexList: { key: string; label: string }[];
    selectedIndex: string;
    onChange: (key: string) => void;
    counts: Record<string, number>;
}

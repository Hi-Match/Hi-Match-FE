import axiosInstance from "./axiosInstance";

// 지원서 조회 --------------------------------------------------------------------------------

/**
 * 지원서 페이지 조회 API
 * @param category 카테고리 (total)
 * @returns maxPage (총 페이지 수)
 */
export const getApplicationPage = async (category: string) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/page?category=${category}`
    );
    return data;
};

/**
 * 지원서 지원 현황 COUNT API
 * @returns 지원 현황 카운트 (total, submit, progress, resumePass, finalPass, fail)
 */
export const getApplicationCount = async () => {
    const { data } = await axiosInstance.get(
        "/himatch/application/member/count"
    );
    return data;
};

/**
 * 지원서 지원 목록 검색 조회 API
 * @param params 검색 조건 (category: 'TOTAL', keyword: string, page: number)
 * @returns 지원서 목록 (maxPage, list[])
 */
export interface ApplicationSearchParams {
    category: "TOTAL";
    keyword: string;
    page: number;
}

export interface ApplicationResponse {
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

export const searchApplications = async (
    params: ApplicationSearchParams
): Promise<ApplicationResponse> => {
    const { data } = await axiosInstance.post(
        "/himatch/application/member/search",
        params
    );
    return data;
};

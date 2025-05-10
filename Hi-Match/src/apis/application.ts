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

export const searchApplications = async (
    params: ApplicationSearchParams
): Promise<ApplicationResponse> => {
    const { data } = await axiosInstance.post(
        "/himatch/application/member/search",
        params
    );
    return data;
};

/**
 * 지원자 전체 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 전체 목록
 */
export const getAllApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/total?page=${page}`
    );
    return data;
};

/**
 * 지원자 접수 완료 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 접수 완료 목록
 */
export const getSubmittedApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/submit?page=${page}`
    );
    return data;
};

/**
 * 지원자 서류 검토 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 서류 검토 목록
 */
export const getProgressApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/progress?page=${page}`
    );
    return data;
};

/**
 * 지원자 서류 합격 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 서류 합격 목록
 */
export const getResumePassApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/resume_pass?page=${page}`
    );
    return data;
};

/**
 * 지원자 최종 합격 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 최종 합격 목록
 */
export const getFinalPassApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/final_pass?page=${page}`
    );
    return data;
};

/**
 * 지원자 불합격 목록 조회 API
 * @param page 페이지 번호
 * @returns 지원자 불합격 목록
 */
export const getFailApplications = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/fail?page=${page}`
    );
    return data;
};

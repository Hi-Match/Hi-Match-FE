import axiosInstance from "./axiosInstance";

// 개인 (회원 / member) --------------------------------------------------------------------------------

/**
 * 지원서 페이지 조회 API
 * @param category 카테고리 (total)
 * @returns maxPage (총 페이지 수)
 */
export const getApplicationPage = async (category: string) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/page?applicationStatus=${category}`
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

export const searchApplications = async (params: {
    keyword: string;
    category: string;
    page: number;
}): Promise<ApplicationResponse> => {
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

/**
 * 지원서 상세 조회 API
 * @param applicationNo 지원서 번호
 * @returns 지원서 상세 정보
 */
export const getApplicationDetail = async (applicationNo: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/application/member/detail?applicationNo=${applicationNo}`
    );
    return data;
};

/**
 * 지원서 지원(제출) API
 * @param payload 지원서 제출 데이터
 * @returns 성공 메시지
 */
export const applyApplication = async (payload: {
    postingNo: number;
    resumeNo: number;
    question: Array<{
        question: string;
        questionLength: number;
        questionContent: string;
    }>;
}) => {
    const { data } = await axiosInstance.post(
        "/himatch/application/member/apply",
        payload
    );
    return data;
};

/**
 * 개인 채용 목록 검색 API
 * @param params 검색 조건
 * @returns 채용 목록
 */
export const getMemberJobList = async (params: {
    companyAddress?: string[];
    companyPart?: string[];
    companyType?: string[];
    postingEducation?: string[];
    keyword?: string;
    page: number;
}) => {
    const { data } = await axiosInstance.post(
        "/himatch/application/member/job-list",
        params
    );
    return data;
};

/**
 * 개인 채용 목록 page 검색 API
 * @param params 검색 조건
 * @returns 페이지 수
 */
export const getMemberJobListPage = async (params: {
    companyAddress?: string[];
    companyPart?: string[];
    companyType?: string[];
    postingEducation?: string[];
    keyword?: string;
}) => {
    const { data } = await axiosInstance.post(
        "/himatch/application/member/search-page",
        params
    );
    return data;
};

// 공통 --------------------------------------------------------------------------------

// 기업 (business) --------------------------------------------------------------------------------

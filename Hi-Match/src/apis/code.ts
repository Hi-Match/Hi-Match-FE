import axiosInstance from "./axiosInstance";

// 기업 --------------------------------------------------------------------------------
/**
 * 기업 인재상 조회 API
 * @param code
 * @returns
 */
export const getCompanyPersonalityCode = async (code: string) => {
    const { data } = await axiosInstance.get(
        `/himatch/code/company/select?code=${code}`
    );

    return data;
};

/**
 * 기업 인재상 등록 API
 * @param code 기업 인재상 코드
 * @returns 등록 결과 메시지
 */
export const registerCompanyPersonalityCode = async (code: string) => {
    const { data } = await axiosInstance.post(
        "/himatch/code/company/register",
        { code }
    );
    return data;
};

/**
 * 기업 인재상 삭제 API
 * @param code 기업 인재상 코드
 * @returns 삭제 결과 메시지
 */
export const deleteCompanyPersonalityCode = async (code: string) => {
    const { data } = await axiosInstance.delete(
        "/himatch/code/company/delete",
        { data: { code } }
    );
    return data;
};

// 개인 --------------------------------------------------------------------------------

/**
 * 최근 응시 내역 시간 조회 API (개인)
 * @returns 최근 응시 내역 시간
 */
export const getMemberRecentTestTime = async () => {
    const { data } = await axiosInstance.get("/himatch/code/member/time");
    return data;
};

/**
 * 개인 인성검사 - 문제 리스트 A 조회 API (Y/N)
 * @returns 문제 리스트
 */
export const getMemberQuestionListA = async () => {
    const { data } = await axiosInstance.get(
        "/himatch/code/member/question-list-a"
    );
    return data;
};

/**
 * 개인 인성검사 - 문제 리스트 B 조회 API (6단계)
 * @returns 문제 리스트
 */
export const getMemberQuestionListB = async () => {
    const { data } = await axiosInstance.get(
        "/himatch/code/member/question-list-b"
    );
    return data;
};

/**
 * 개인 인성검사 - 검사 결과 API
 * @param answers 답변 리스트
 * @returns 검사 결과 (code, description 등)
 */
export const postMemberTestResult = async (
    answers: { question: string; response: string }[]
) => {
    const { data } = await axiosInstance.post(
        "/himatch/code/member/result",
        answers
    );
    return data;
};

/**
 * 개인 인성검사 - 검사 상세 조회 API
 * @returns 검사 상세 결과 (code, slogan, description, detail 등)
 */
export const getMemberTestResultDetail = async () => {
    const { data } = await axiosInstance.get("/himatch/code/member/result");
    return data;
};

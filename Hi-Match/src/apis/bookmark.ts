import axiosInstance from "./axiosInstance";

/**
 * 북마크 목록 조회 API
 * @param page 페이지 번호
 * @returns 북마크 목록
 */
export const getBookmarkList = async (page: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/bookmark/list?page=${page}`
    );
    return data;
};

/**
 * 북마크 최대 페이지 조회 API
 * @returns 마지막 페이지
 */
export const getBookmarkMaxPage = async (keyword: string) => {
    const { data } = await axiosInstance.get(
        `/himatch/bookmark/page?keyword=${keyword}`
    );
    return data;
};

/**
 * 북마크 검색 API
 * @param page 페이지 번호 
 * @param keyword 검색 단어어
 * @returns 북마크 목록
 */
export const getBookmarkSearch = async (page: number, keyword: String) => {
    const { data } = await axiosInstance.post(
        `/himatch/bookmark/search`,
        { 
            page : page,
            keyword : keyword
        });
    return data;
};

/**
 * 북마크 등록 API
 * @param postingNo 채용공고 번호 
 * @returns 등록 결과 메시지
 */
export const getBookmarkRegister = async (postingNo: number) => {
    const { data } = await axiosInstance.post(
        `/himatch/bookmark/register`,
        { 
            postingNo : postingNo
        });
    return data;
};

/**
 * 북마크 삭제 API
 * @param bookMarkNo 북마크 번호 
 * @returns 삭제 결과 메시지
 */
export const deleteBookmarkDelete = async (bookMarkNo: number) => {
    const { data } = await axiosInstance.delete(
        `/himatch/bookmark/delete?bookMarkNo=${bookMarkNo}`
    );
    return data;
};

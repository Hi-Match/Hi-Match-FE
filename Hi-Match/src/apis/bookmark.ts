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

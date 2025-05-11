// import { useEffect, useState } from "react";
import { getBookmarkSearch } from "@/apis/bookmark";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useBookmarkSearch = (page: number = 1, keyword: string = "") => {
    const queryResult = useQuery({
        queryKey: ["bookmarks", "search", page, keyword], // 검색 조건(페이지, 키워드)을 포함한 queryKey
        queryFn: () => getBookmarkSearch(page, keyword)
    });

    return {
        bookmarks: queryResult.data ?? [], // 데이터가 없을 경우 빈 배열 반환
        loading: queryResult.isLoading,
        error: queryResult.error?.message,
        isFetching: queryResult.isFetching, // 백그라운드 데이터 fetching 여부
        refetch: queryResult.refetch, // 수동으로 데이터 fetching을 트리거하는 함수
    };
};
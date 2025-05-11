// import { useEffect, useState } from "react";
import { getBookmarkMaxPage } from "@/apis/bookmark";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useBookmarkMaxPage = (keyword: string = "") => {
    const queryResult = useQuery({
        queryKey: ["bookmarks", "maxPage", keyword], // queryKey에 keyword 포함
        queryFn: () => getBookmarkMaxPage(keyword), // keyword를 인자로 전달
        select: (data) => data?.maxPage ?? 0,
        staleTime: Infinity,
        enabled: true, // 기본적으로 쿼리 실행
    });

    return {
        totalPages: queryResult.data ?? 0,
        loadingMaxPage: queryResult.isLoading,
        errorMaxPage: queryResult.error?.message,
        isFetchingMaxPage: queryResult.isFetching,
        refetchMaxPage: queryResult.refetch,
    };
};
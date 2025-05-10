import { useEffect, useState } from "react";
import { getBookmarkList } from "@/apis/bookmark";

export const useBookmarkList = (page: number = 1) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getBookmarkList(page)
            .then(data => setBookmarks(data))
            .catch(() => setError("북마크 목록을 불러오지 못했습니다."))
            .finally(() => setLoading(false));
    }, [page]);

    return { bookmarks, loading, error };
};

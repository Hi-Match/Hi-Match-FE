// src/hooks/bookmark/useBookmark.ts
import { useState } from "react";
import { getBookmarkRegister, deleteBookmarkDelete } from "@/apis/bookmark";
import { toast } from "react-hot-toast";

interface UseBoolmarkToggleProps {
    initialBookmarkNo: number | null;
    postingNo: number;
}

export const UseBoolmarkToggle = ({ initialBookmarkNo, postingNo }: UseBoolmarkToggleProps) => {
    const [bookmarkNo, setBookmarkNo] = useState<number | null>(initialBookmarkNo);

    const toggleBookmark = async () => {
        // 이전 상태 저장 (실패 시 복구용)
        const previousBookmarkNo = bookmarkNo;
        
        try {
            if (bookmarkNo) {
                // 낙관적 업데이트: UI 먼저 변경
                setBookmarkNo(null);
                // API 호출
                await deleteBookmarkDelete(bookmarkNo);
            } else {
                // 낙관적 업데이트: UI 먼저 변경
                setBookmarkNo(-1); // 임시 북마크 번호
                // API 호출
                const response = await getBookmarkRegister(postingNo);
                // 실제 북마크 번호로 업데이트
                setBookmarkNo(response.bookMarkNo);
            }
        } catch (error) {
            // 실패 시 이전 상태로 복구
            setBookmarkNo(previousBookmarkNo);
            toast.error("북마크 처리 중 오류가 발생했습니다.");
        }
    };

    return {
        isBookmarked: bookmarkNo !== null,
        toggleBookmark
    };
};
// src/hooks/bookmark/useBookmark.ts
import { useState } from "react";
import { getBookmarkRegister, deleteBookmarkDelete } from "@/apis/bookmark";
import { toast } from "react-hot-toast";

interface UseBoolmarkToggleProps {
    initialBookMarkNo: number | null;
    postingNo: number;
}

export const UseBoolmarkToggle = ({
    initialBookMarkNo,
    postingNo,
}: UseBoolmarkToggleProps) => {
    const [bookMarkNo, setBookMarkNo] = useState<number | null>(
        initialBookMarkNo
    );

    const toggleBookmark = async () => {
        // 이전 상태 저장 (실패 시 복구용)
        const previousBookMarkNo = bookMarkNo;

        try {
            if (bookMarkNo !== null) {
                // API 호출
                await deleteBookmarkDelete(bookMarkNo);
                // API 호출 성공 후 UI 업데이트
                setBookMarkNo(null);
            } else {
                // API 호출
                const response = await getBookmarkRegister(postingNo);
                // API 호출 성공 후 UI 업데이트
                setBookMarkNo(response.bookMarkNo);
            }
        } catch (error) {
            // 실패 시 이전 상태로 복구
            setBookMarkNo(previousBookMarkNo);
            toast.error("북마크 처리 중 오류가 발생했습니다.");
        }
    };

    return {
        isBookmarked: bookMarkNo !== null,
        toggleBookmark,
    };
};

import { useState, useRef } from "react";
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
    const isProcessing = useRef(false);

    const toggleBookmark = async () => {
        // 이미 처리 중인 경우 추가 요청 방지
        if (isProcessing.current) {
            return;
        }

        const previousBookMarkNo = bookMarkNo;
        isProcessing.current = true;

        try {
            if (previousBookMarkNo !== null) {
                // 삭제 API 호출
                const response = await deleteBookmarkDelete(previousBookMarkNo);
                if (response.message === "Success!") {
                    setBookMarkNo(null);
                } else {
                    throw new Error("북마크 삭제 실패");
                }
            } else {
                // 등록 API 호출
                const response = await getBookmarkRegister(postingNo);
                if (response.message === "Success!") {
                    setBookMarkNo(postingNo);
                } else {
                    throw new Error("북마크 등록 실패");
                }
            }
        } catch (error) {
            toast.error("이미 등록된 공고이거나 잘못된 접근입니다.");
            console.error("북마크 에러:", error);
        } finally {
            isProcessing.current = false;
        }
    };

    return {
        isBookmarked: bookMarkNo !== null,
        toggleBookmark,
    };
};

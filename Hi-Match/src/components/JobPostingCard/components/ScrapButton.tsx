import { UseBoolmarkToggle } from "@/hooks/bookmark/useBoolmarkToggle";

interface ScrapButtonProps {
    bookmarkNo: number | null;
    postingNo: number;
}

const ScrapButton = ({ bookmarkNo, postingNo }: ScrapButtonProps) => {
    const { isBookmarked, toggleBookmark } = UseBoolmarkToggle({
        initialBookmarkNo: bookmarkNo,
        postingNo,
    });

    return (
        <button
            onClick={e => {
                e.stopPropagation(); // 부모의 클릭 이벤트 방지
                toggleBookmark();
            }}
            className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-black/40 text-xl text-white/80"
        >
            {isBookmarked ? "★" : "☆"}
        </button>
    );
};

export default ScrapButton;

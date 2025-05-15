import ArrowLeftIcon from "@/assets/icons/angle-left-icon.svg?react";
import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; // 현재 페이지 양 옆에 몇 개 보여줄지 (기본값 1)
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const safeCurrentPage = Number(currentPage) || 1;
    const safeTotalPages = Number(totalPages) || 1;

    // 페이지 번호 배열 생성 로직
    const getPageNumbers = () => {
        // 페이지가 2개 이하일 때는 모두 보여줌
        if (safeTotalPages <= 2) {
            return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
        }

        const totalNumbers = siblingCount * 2 + 5;
        if (safeTotalPages <= totalNumbers) {
            return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
        }

        const leftSibling = Math.max(safeCurrentPage - siblingCount, 1);
        const rightSibling = Math.min(
            safeCurrentPage + siblingCount,
            safeTotalPages
        );

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < safeTotalPages - 1;

        const pages: (number | string)[] = [];

        if (showLeftDots) pages.push("...");
        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i);
        }
        if (showRightDots) pages.push("...");
        pages.push(safeTotalPages);

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav className="my-4 flex justify-center gap-4">
            <button
                disabled={safeCurrentPage === 1}
                onClick={() => onPageChange(safeCurrentPage - 1)}
                className="cursor-pointer rounded bg-blue-500 p-1 hover:bg-blue-600 disabled:cursor-default disabled:bg-gray-300"
                aria-label="이전 페이지"
            >
                <ArrowLeftIcon className="h-6 w-6 fill-white" />
            </button>
            {pages.map((page, idx) =>
                typeof page === "number" ? (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`cursor-pointer rounded px-2 py-1 ${page === safeCurrentPage ? "text-semibold text-blue-500 underline" : "text-gray-400"}`}
                    >
                        {page}
                    </button>
                ) : (
                    safeTotalPages > 2 && (
                        <span
                            key={`dots-${idx}`}
                            className="px-2 py-1 text-gray-400 select-none"
                        >
                            ...
                        </span>
                    )
                )
            )}
            <button
                disabled={safeCurrentPage >= safeTotalPages}
                onClick={() => onPageChange(safeCurrentPage + 1)}
                className="cursor-pointer rounded bg-blue-500 p-1 text-white hover:bg-blue-600 disabled:cursor-default disabled:bg-gray-300"
                aria-label="다음 페이지"
            >
                <ArrowRightIcon className="h-6 w-6 fill-white" />
            </button>
        </nav>
    );
};

export default Pagination;

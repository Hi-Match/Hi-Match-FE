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

        pages.push(1);
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
                className="rounded bg-blue-500 px-3 py-1  text-white disabled:bg-gray-300 hover:bg-blue-600 cursor-pointer disabled:cursor-default"
                aria-label="이전 페이지"
            >
                &lt;
            </button>
            {pages.map((page, idx) =>
                typeof page === "number" ? (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`rounded px-2 py-1 ${page === safeCurrentPage ? "text-semibold text-blue-500 underline" : "text-gray-400"}`}
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
                className="rounded bg-blue-500 px-3 py-1 text-white disabled:bg-gray-300 hover:bg-blue-600 cursor-pointer disabled:cursor-default"
                aria-label="다음 페이지"
            >
                &gt;
            </button>
        </nav>
    );
};

export default Pagination;

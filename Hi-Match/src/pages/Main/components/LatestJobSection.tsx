import { useEffect } from "react";
import { toast } from "react-hot-toast";
import JobPostingCardList from "@/components/JobPostingCard/JobPostingCardList";
import Pagination from "@/components/Pagination/Pagination";

interface LatestJobSectionProps {
    jobPostings: JobPosting[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    maxPage: number;
    setCurrentPage: (page: number) => void;
}

const LatestJobSection = ({
    jobPostings,
    loading,
    error,
    currentPage,
    maxPage,
    setCurrentPage,
}: LatestJobSectionProps) => {
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-semibold text-black">
                최신 공고 모아보기 🔥
            </h3>
            {loading ? (
                <div className="py-10 text-center">로딩 중...</div>
            ) : jobPostings.length === 0 ? (
                <div className="py-10 text-center text-gray-400 text-xl">
                    조회된 공고가 없습니다.
                </div>
            ) : (
                <>
                    <JobPostingCardList jobPostings={jobPostings} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={maxPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default LatestJobSection;

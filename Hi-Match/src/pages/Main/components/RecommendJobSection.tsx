import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import JobPostingCardList from "@/components/JobPostingCard/JobPostingCardList";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface RecommendJobSectionProps {
    jobPostings: JobPosting[];
    loading: boolean;
    error: string | null;
}

const RecommendJobSection = ({
    jobPostings,
    loading,
    error,
}: RecommendJobSectionProps) => {
    const { user } = useUserStore();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(jobPostings.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage(prev => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentPagePosts = () => {
        const startIndex = currentPage * itemsPerPage;
        return jobPostings.slice(startIndex, startIndex + itemsPerPage);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (!user) return null;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black">
                    {`${user?.memberName}님을 위한 추천 직무예요! 😎`}
                </h3>

                {/* 버튼 그룹을 헤더 우측으로 이동 */}
                <div className="flex gap-2">
                    <button
                        onClick={prevPage}
                        className="cursor-pointer rounded-full border border-gray-300 bg-white p-2 text-black hover:bg-gray-100"
                    >
                        <IoIosArrowBack size={20} />
                    </button>
                    <button
                        onClick={nextPage}
                        className="cursor-pointer rounded-full border border-gray-300 bg-white p-2 text-black hover:bg-gray-100"
                    >
                        <IoIosArrowForward size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-10 text-center">로딩 중...</div>
            ) : (
                <div>
                    <JobPostingCardList jobPostings={getCurrentPagePosts()} />

                    {/* 페이지네이션 닷 */}
                    <div className="mt-4 flex justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                className={`h-2 w-2 rounded-full ${
                                    currentPage === idx
                                        ? "bg-black"
                                        : "bg-gray-300"
                                }`}
                                onClick={() => setCurrentPage(idx)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendJobSection;

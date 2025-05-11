import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import JobPostingCardList from "@/components/JobPostingCard/JobPostingCardList";

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

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-semibold text-black">
                {`${user?.memberName}님을 위한 추천 직무예요! 😎`}
            </h3>
            {loading ? (
                <div className="py-10 text-center">로딩 중...</div>
            ) : (
                <JobPostingCardList jobPostings={jobPostings} />
            )}
        </div>
    );
};

export default RecommendJobSection;

import { useState, useEffect } from "react";
import { getRecommendJobList } from "@/apis/application";

export const useRecommandJobPostings = () => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getRecommendJobList()
            .then(data => setJobPostings(data))
            .catch(err => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "추천 직무를 불러오지 못했습니다."
                );
            })
            .finally(() => setLoading(false));
    }, []);

    return { jobPostings, loading, error };
};

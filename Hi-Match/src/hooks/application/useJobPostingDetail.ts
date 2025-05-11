import { useState, useEffect } from "react";
import { getJobPostingDetail } from "@/apis/application";

export const useJobPostingDetail = (postingNo: number) => {
    const [data, setData] = useState<JobPostingDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postingNo) return;
        setLoading(true);
        setError(null);
        getJobPostingDetail(postingNo)
            .then(res => setData(res))
            .catch(err => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "채용공고를 불러오지 못했습니다."
                );
            })
            .finally(() => setLoading(false));
    }, [postingNo]);

    return { data, loading, error };
};

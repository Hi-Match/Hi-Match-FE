import { useState, useEffect } from "react";
import { getMemberJobList, getMemberJobListPage } from "@/apis/application";

interface JobPostingParams {
    companyAddress?: string[];
    companyPart?: string[];
    companyType?: string[];
    postingEducation?: string[];
    keyword?: string;
    page: number;
}

export const useJobPostings = (params: JobPostingParams) => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getMemberJobList(params)
            .then(data => {
                setJobPostings(Array.isArray(data) ? data : data.list || []);
            })
            .catch(err => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "채용공고를 불러오지 못했습니다."
                );
            })
            .finally(() => setLoading(false));
    }, [JSON.stringify(params)]);

    useEffect(() => {
        // page를 제외한 검색 조건만 추출
        const { ...searchParams } = params;
        getMemberJobListPage(searchParams)
            .then(data => {
                setMaxPage(data.page || 1);
            })
            .catch(() => setMaxPage(1));
    }, [JSON.stringify({ ...params, page: undefined })]);

    return { jobPostings, loading, error, maxPage };
};

import { useState, useEffect } from "react";
import { getJobPostingDetail } from "@/apis/application";
import axiosInstance from "@/apis/axiosInstance";

const getCompanyInfo = async (companyNo: number) => {
    const { data } = await axiosInstance.get(
        `/himatch/company/info/detail-select?companyNo=${companyNo}`
    );
    return data;
};

export const useJobPostingDetail = (postingNo: number, companyNo: number) => {
    const [data, setData] = useState<JobPostingDetail | null>(null);
    const [company, setCompany] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postingNo) return;
        setLoading(true);
        setError(null);

        Promise.all([getJobPostingDetail(postingNo), getCompanyInfo(companyNo)])
            .then(([posting, companyInfo]) => {
                setData(posting);
                setCompany(companyInfo);
            })
            .catch(err => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "채용공고를 불러오지 못했습니다."
                );
            })
            .finally(() => setLoading(false));
    }, [postingNo]);

    return { data, company, loading, error };
};

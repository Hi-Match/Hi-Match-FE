import { useState, useEffect } from "react";
import { getJobPostingDetail } from "@/apis/application";
import axiosInstance from "@/apis/axiosInstance";
import { toast } from "react-hot-toast";

export const useJobPostingDetail = (postingNo: number) => {
    const [data, setData] = useState<JobPostingDetail | null>(null);
    const [company, setCompany] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCompanyInfo = async (companyNo: number) => {
        try {
            const { data } = await axiosInstance.get(
                `/himatch/company/info/detail-select?companyNo=${companyNo}`
            );
            return data;
        } catch (error) {
            toast.error("데이터를 불러올 수 없습니다");
            return null;
        }
    };

    useEffect(() => {
        if (!postingNo) return;
        setLoading(true);
        setError(null);

        getJobPostingDetail(postingNo)
            .then(async posting => {
                setData(posting);

                // posting에서 companyNo 받아와서 회사 정보 조회
                if (posting?.companyNo) {
                    const companyInfo = await getCompanyInfo(posting.companyNo);
                    setCompany(companyInfo);
                }
            })
            .catch(err => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "채용 공고를 불러오지 못했습니다."
                );
            })
            .finally(() => setLoading(false));
    }, [postingNo]);

    return { data, company, loading, error, getCompanyInfo };
};

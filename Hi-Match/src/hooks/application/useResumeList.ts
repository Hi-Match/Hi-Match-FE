import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";

export const useResumeList = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedResumeNo, setSelectedResumeNo] = useState<number | null>(
        null
    );

    const fetchResumes = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosInstance.get<ResumeListResponse>(
                "/himatch/resume/list"
            );
            // 데이터가 배열이 아니거나 undefined인 경우 빈 배열로 처리
            setResumes(Array.isArray(data) ? data : []);

            if (Array.isArray(data) && data.length > 0 && !selectedResumeNo) {
                setSelectedResumeNo(data[0].resumeNo);
            }
        } catch (error) {
            // 에러 발생 시 빈 배열로 처리
            setResumes([]);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    return {
        resumes,
        isLoading,
        selectedResumeNo,
        setSelectedResumeNo,
        refetch: fetchResumes,
    };
};

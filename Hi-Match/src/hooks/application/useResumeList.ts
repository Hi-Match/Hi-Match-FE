import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";
import { toast } from "react-hot-toast";

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
            setResumes(data);

            // 기본적으로 첫 번째 이력서 선택
            if (data.length > 0 && !selectedResumeNo) {
                setSelectedResumeNo(data[0].resumeNo);
            }
        } catch (error) {
            toast.error("이력서 목록을 불러오는데 실패했습니다.");
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

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
            const response = await axiosInstance.get("/himatch/resume/list");

            // 응답 데이터 검증 및 안전한 파싱
            let parsedData;
            if (typeof response.data === "string") {
                try {
                    parsedData = JSON.parse(response.data);
                } catch {
                    parsedData = [];
                }
            } else {
                parsedData = response.data;
            }

            // 배열 형태 확인
            const validData = Array.isArray(parsedData) ? parsedData : [];
            setResumes(validData);

            if (validData.length > 0 && !selectedResumeNo) {
                setSelectedResumeNo(validData[0].resumeNo);
            }
        } catch (error) {
            console.error("Resume list fetch error:", error);
            setResumes([]);
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

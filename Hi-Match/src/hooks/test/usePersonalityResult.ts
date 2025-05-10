import { useEffect, useState } from "react";
import { getMemberTestResultDetail } from "@/apis/code";

interface PersonalityResult {
    code: string;
    slogan: string;
    description: string;
    detail: string;
}

export const usePersonalityResult = () => {
    const [result, setResult] = useState<PersonalityResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setIsLoading(true);
                const data = await getMemberTestResultDetail();
                setResult(data);
            } catch (err) {
                setError("결과를 불러오는데 실패했습니다.");
                console.error("결과 조회 실패:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResult();
    }, []);

    return { result, isLoading, error };
};

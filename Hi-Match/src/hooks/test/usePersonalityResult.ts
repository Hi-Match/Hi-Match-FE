import { useEffect, useState } from "react";
import { getMemberTestResultDetail } from "@/apis/code";

export const usePersonalityResult = () => {
    const [result, setResult] = useState<PersonalityResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getMemberTestResultDetail()
            .then(data => {
                setResult(data);
            })
            .catch(err => {
                setError("결과를 불러오지 못했습니다.");
                console.error("결과를 불러오지 못했습니다.", err);
                setResult(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { result, isLoading, error };
};

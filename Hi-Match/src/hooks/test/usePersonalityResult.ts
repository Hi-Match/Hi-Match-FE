import { useEffect, useState } from "react";
// import { getMemberTestResultDetail } from "@/apis/code"; // 실제 API는 주석 처리

const MOCK_RESULT: PersonalityResult = {
    code: "NBLS",
    slogan: "나침반!",
    description: "당신은짱이예요\n",
    rate: {
        n: "52.5",
        f: "47.5",
        d: "52.5",
        b: "47.5",
        c: "35",
        l: "65",
        s: "57.5",
        o: "42.5",
    },
    detail: [
        {
            title: "긍정적 에너지와 팀 활력 유지",
            detailContent: [
                "유쾌하고 따뜻한 말투로 팀 분위기를 부드럽게 만듭니다.",
                "상황을 유연하게 해석하며 모두가 참여할 수 있게 돕습니다.",
            ],
        },
        {
            title: "창의적 문제 해결",
            detailContent: [
                "새로운 아이디어로 문제를 해결합니다.",
                "팀원들과의 협업을 통해 시너지를 냅니다.",
            ],
        },
    ],
};

export const usePersonalityResult = () => {
    const [result, setResult] = useState<PersonalityResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 실제 API 호출 대신 목데이터 사용
        setIsLoading(true);
        setTimeout(() => {
            setResult(MOCK_RESULT);
            setIsLoading(false);
        }, 500);
    }, []);

    return { result, isLoading, error };
};

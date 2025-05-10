import { usePersonalityResult } from "@/hooks/test/usePersonalityResult";
import PersonalityTypeCard from "./PersonalityTypeCard";
import AIAnalysisCard from "./AIAnalysisCard";
import PersonalityReportTitle from "./PersonalityReportTitle";

const PersonalityReportBox = () => {
    const { result, isLoading } = usePersonalityResult();

    if (isLoading) return <div>로딩 중...</div>;
    if (!result) return <div>결과가 없습니다.</div>;

    return (
        <div>
            <PersonalityReportTitle code={result.code} slogan={result.slogan} />
            <div className="mt-4">
                <PersonalityTypeCard description={result.description} />
                <div className="mt-6">
                    <AIAnalysisCard detail={result.detail} />
                </div>
            </div>
        </div>
    );
};

export default PersonalityReportBox;

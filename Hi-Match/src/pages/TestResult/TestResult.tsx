import PersonalityReportTitle from "../MyPage/PersonalityResult/components/PersonalityReportTitle";
import AIAnalysisCard from "../MyPage/PersonalityResult/components/AIAnalysisCard";

const TestResult = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-14 px-15">
            <h2 className="text-3xl font-semibold text-black">
                닉네임님의 인성 검사 결과 📋
            </h2>
            <PersonalityReportTitle />
            <AIAnalysisCard />
        </div>
    );
};

export default TestResult;

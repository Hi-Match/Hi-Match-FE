import InterrogationIcon from "@/assets/icons/interrogation-icon.svg?react";
import AIAnalysisCard from "../MyPage/PersonalityResult/components/AIAnalysisCard";
import BinaryChoiceWrapper from "./components/BinaryChoiceWrapper";

const CompanyIdeal = () => {
    return (
        <>
        <section className="mx-auto flex w-full max-w-[1000px] flex-col gap-16 rounded-2xl bg-white p-14 shadow-sm">
            <hgroup className="flex items-center gap-2">
                <h2 className="text-2xl font-medium">인재상 관리</h2>
                <InterrogationIcon />
            </hgroup>
            <BinaryChoiceWrapper />
            <AIAnalysisCard
                detail={[
                    {
                        title: "인재상 분석",
                        detailContent: [
                            "당신의 인재상을 분석하고, 회사의 인재상을 설정합니다.",
                        ],
                    },
                ]}
                />
            </section>
            <div className="absolute bottom-0 left-0 right-0 flex justify-end items-center bg-white p-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    설정 완료
                </button>
            </div>
        </>
    );
};

export default CompanyIdeal;

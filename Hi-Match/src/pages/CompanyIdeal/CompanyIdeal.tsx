import InterrogationIcon from "@/assets/icons/interrogation-icon.svg?react";
import AIAnalysisCard from "../MyPage/PersonalityResult/components/AIAnalysisCard";
import BinaryChoiceWrapper from "./components/BinaryChoiceWrapper";
import { useCompanyIdeal } from "@/hooks/business/useCompanyIdeal";
import { toast } from "react-hot-toast";
import { useCompanyIdealStore } from "@/store/useCompanyIdealStore";

const CompanyIdeal = () => {
    const { registerIdeal } = useCompanyIdeal();
    const getIdealCode = useCompanyIdealStore(state => state.getIdealCode);
    const analysisDetail = useCompanyIdealStore(state => state.analysisDetail);

    const handleRegister = async () => {
        const code = getIdealCode();
        if (code.length === 4) {
            try {
                await registerIdeal(code);
                toast.success("인재상이 성공적으로 등록되었습니다.");
            } catch (error) {
                toast.error("인재상 등록에 실패했습니다.");
            }
        } else {
            toast.error("모든 항목을 선택해주세요.");
        }
    };

    return (
        <>
            <section className="mx-auto flex w-full max-w-[1000px] flex-col gap-16 rounded-2xl bg-white p-14 shadow-sm">
                <hgroup className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">인재상 관리</h2>
                    <InterrogationIcon />
                </hgroup>
                <BinaryChoiceWrapper />
                {analysisDetail?.length ? (
                    <AIAnalysisCard detail={analysisDetail} />
                ) : null}
            </section>
            <div className="absolute right-0 bottom-0 left-0 flex items-center justify-end bg-white p-4">
                <button
                    onClick={handleRegister}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    설정 완료
                </button>
            </div>
        </>
    );
};

export default CompanyIdeal;

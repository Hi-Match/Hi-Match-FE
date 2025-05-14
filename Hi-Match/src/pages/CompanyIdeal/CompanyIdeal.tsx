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
        <div className="company_ideal mb-27.5">
            <section className="mx-auto flex w-full max-w-[1000px] min-w-[1000px] flex-col gap-16 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-14 shadow-sm">
                <hgroup className="flex items-center gap-2">
                    <h2 className="text-2xl font-medium">인재상 관리</h2>
                    <InterrogationIcon />
                </hgroup>
                <BinaryChoiceWrapper />
                {analysisDetail?.length ? (
                    <AIAnalysisCard detail={analysisDetail} />
                ) : null}
            </section>
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <button
                    type="button"
                    onClick={handleRegister}
                    className="btn-blue h-10 w-25 text-base"
                >
                    설정 완료
                </button>
            </div>
        </div>
    );
};

export default CompanyIdeal;

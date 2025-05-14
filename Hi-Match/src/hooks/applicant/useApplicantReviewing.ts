import axiosInstance from "@/apis/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface GradePayload {
    applicationNo: number;
    applicationGrade: number;
}

export const useApplicantReviewing = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: GradePayload) =>
            axiosInstance.post("/himatch/application/company/score", payload),
        onSuccess: () => {
            navigate("/company/applicants");
            toast.success(
                "점수가 등록되었습니다. 현재 지원자를 서류 검토로 이동합니다."
            );
        },
        onError: () => {
            toast.error("점수 등록에 실패했습니다. 다시 시도해 주세요.");
        },
    });
};

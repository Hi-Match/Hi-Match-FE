import axiosInstance from "@/apis/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FinalPassPayload {
    applicationNo: number;
}

export const useApplicantFinalPass = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: FinalPassPayload) =>
            axiosInstance.post(
                "/himatch/application/company/final-pass",
                payload
            ),
        onSuccess: () => {
            navigate("/company/applicants");
            toast.success("현재 지원자의 최종 합격 처리가 완료되었습니다.");
        },
        onError: () => {
            toast.error("지원자 상태 변경에 실패했습니다. 다시 시도해 주세요.");
        },
    });
};

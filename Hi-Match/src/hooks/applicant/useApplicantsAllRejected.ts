import axiosInstance from "@/apis/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AllRejectedPayload {
    postingNo: number;
    category: string;
}

export const useApplicantsAllRejected = () => {
    return useMutation({
        mutationFn: (payload: AllRejectedPayload) =>
            axiosInstance.post(
                "/himatch/application/company/category-fail",
                payload
            ),
        onError: () => {
            toast.error("지원자 상태 변경에 실패했습니다. 다시 시도해 주세요.");
        },
    });
};

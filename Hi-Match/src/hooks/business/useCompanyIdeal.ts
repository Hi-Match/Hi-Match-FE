import axiosInstance from "@/apis/axiosInstance";

export const useCompanyIdeal = () => {
    // 인재상 분석 조회
    const fetchIdealAnalysis = async (code: string) => {
        const response = await axiosInstance.get(
            `/himatch/code/company/select?code=${code}`
        );
        return response.data;
    };

    // 인재상 등록
    const registerIdeal = async (code: string) => {
        const response = await axiosInstance.post(
            "/himatch/code/company/register",
            {
                code,
            }
        );
        return response.data;
    };

    return {
        fetchIdealAnalysis,
        registerIdeal,
    };
};

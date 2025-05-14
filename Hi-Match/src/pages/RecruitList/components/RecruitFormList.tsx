import axiosInstance from "@/apis/axiosInstance";
import { useQueries } from "@tanstack/react-query";
import RecruitForm from "./RecruitForm";
import toast from "react-hot-toast";

interface RecruitFormData {
    postingNo: number;
    postingTitle: string;
    postingPart: string;
}

const RecruitFormList = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ["company-info"],
                queryFn: async () => {
                    const response = await axiosInstance.get(
                        "/himatch/company/info/detail"
                    );

                    return response.data;
                },
            },
            {
                queryKey: ["recruit-list"],
                queryFn: async (): Promise<RecruitFormData[]> => {
                    const response = await axiosInstance.get(
                        "/himatch/application/company/posting-list"
                    );

                    return response.data;
                },
            },
        ],
    });

    const companyInfo = results[0].data;
    const recruitFormData = results[1].data;
    const companyImage = companyInfo?.companyImgA ?? "";

    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    if (isLoading) return null;
    if (isError) {
        toast.error(
            "채용 공고를 불러오는 데 실패했습니다. 다시 시도해 주세요."
        );

        return null;
    }

    return (
        <div className="recruit_form_list">
            <div className="space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm mx-auto flex w-full max-w-[1000px] min-w-[1000px] flex-col gap-16 min-h-[80vh] ">
                <h3 className="mb-7.5 text-xl font-semibold text-black">
                    채용중인 공고
                </h3>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-5">
                    {(recruitFormData ?? []).map(
                        ({ postingNo, postingTitle, postingPart }, index) => (
                            <div
                                key={index}
                                className="recruit_form_wrapper col-span-1"
                            >
                                <RecruitForm
                                    postingNo={postingNo}
                                    postingTitle={postingTitle}
                                    postingPart={postingPart}
                                    companyImage={companyImage}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecruitFormList;

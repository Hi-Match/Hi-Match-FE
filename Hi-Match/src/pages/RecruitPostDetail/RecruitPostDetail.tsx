import axiosInstance from "@/apis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import PostDetailForm from "./components/PostDetailForm";
import toast from "react-hot-toast";
import { useState } from "react";
import PostFinishModal from "./components/PostFinishModal";

const RecruitPostDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { postNo } = useParams();

    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["recruit-detail", postNo],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/himatch/application/company/select?postingNo=${postNo}`
            );

            return response.data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.post(`/himatch/application/company/early-finish`, {
                postingNo: Number(postNo),
            }),
        onSuccess: () => {
            toast.success("공고가 마감되었습니다.");
            navigate("/company/recruit/list");
        },
        onError: () => {
            toast.error("공고를 마감하는 데 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const handleClickFinish = () => {
        setIsModalOpen(true);
    };

    if (!data) return null;

    const { postingQuestion, ...rest } = data;

    return (
        <div className="recruit_post_detail">
            <PostDetailForm
                recruitPost={rest}
                postingQuestion={postingQuestion}
            />
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="btn-wrapper">
                    <button
                        type="button"
                        className="btn-blue h-10 w-25 text-base"
                        onClick={handleClickFinish}
                    >
                        마감하기
                    </button>
                </div>
            </div>
            <>
                <PostFinishModal
                    isOpen={isModalOpen}
                    onFinish={mutate}
                    onClose={() => setIsModalOpen(false)}
                />
            </>
        </div>
    );
};

export default RecruitPostDetail;

import axiosInstance from "@/apis/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import RecruitEditForm from "./components/Form/RecruitEditForm";
import CoverLetterFormListEdit from "./components/Form/CoverLetterFormListEdit";

type RecruitPostEditData = RecruitPostData & { postingNo: number };

const RecruitPostEdit = () => {
    const { postNo } = useParams();

    const { data } = useQuery<RecruitPostEditData>({
        queryKey: ["recruit-edit"],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/himatch/application/company/select?postingNo=${postNo}`
            );

            return response.data;
        },
    });

    const [recruitPost, setRecruitPost] = useState<RecruitPostEditData | null>(
        null
    );

    useEffect(() => {
        if (data) {
            const {
                postingTitle,
                postingPart,
                postingType,
                postingWorkType,
                postingWorkStartTime,
                postingWorkEndTime,
                postingSal,
                postingExperience,
                postingEducation,
                postingLocation,
                postingDeadLine,
                postingContent,
                postingIsFinish,
                postingQuestion,
            } = data;

            setRecruitPost({
                postingNo: Number(postNo),
                postingTitle,
                postingPart,
                postingType,
                postingWorkType,
                postingWorkStartTime,
                postingWorkEndTime,
                postingSal,
                postingExperience,
                postingEducation,
                postingLocation,
                postingDeadLine,
                postingContent,
                postingIsFinish,
                postingQuestion,
            });
        }
    }, [data, postNo]);

    // 새로고침 시 window.confirm 호출
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ""; // 브라우저에 따라 이 값은 무시되지만 필수
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: (formData: RecruitPostEditData) =>
            axiosInstance.put("/himatch/application/company/modify", formData),
        onSuccess: () => {
            toast.success("채용 공고 수정이 완료 되었습니다.");
            navigate(`/company/recruit/detail/${postNo}`);
        },
        onError: () => {
            toast.error("채용 공고 수정에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const isRecruitPostingValid = (post?: RecruitPostData): boolean => {
        if (!post || !post.postingQuestion) return false;

        const allQuestionsValid = post.postingQuestion.every(
            q => q.question.trim() !== "" && q.questionLength > 0
        );

        return (
            !!post.postingTitle &&
            !!post.postingPart &&
            !!post.postingType &&
            !!post.postingWorkType &&
            !!post.postingSal &&
            !!post.postingExperience &&
            !!post.postingEducation &&
            !!post.postingLocation &&
            !!post.postingDeadLine &&
            !!post.postingContent &&
            post.postingQuestion.length > 0 &&
            allQuestionsValid
        );
    };

    const handleClickEdit = () => {
        if (recruitPost) {
            mutate(recruitPost);
        }
    };

    if (!recruitPost || !data) return null;

    return (
        <div className="recruit_posting_wrapper mb-37.5">
            <div className="space-y-12.5">
                <RecruitEditForm
                    recruitPost={recruitPost}
                    setRecruitPost={
                        setRecruitPost as React.Dispatch<
                            React.SetStateAction<RecruitPostEditData>
                        >
                    }
                />
                <CoverLetterFormListEdit
                    recruitPost={recruitPost}
                    setRecruitPost={
                        setRecruitPost as React.Dispatch<
                            React.SetStateAction<RecruitPostEditData>
                        >
                    }
                />
            </div>
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="btn-wrapper">
                    <button
                        type="button"
                        className={`h-10 w-25 text-base ${!isRecruitPostingValid(recruitPost) ? "btn-disabled" : "btn-blue"}`}
                        onClick={handleClickEdit}
                        disabled={!isRecruitPostingValid(recruitPost)}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecruitPostEdit;

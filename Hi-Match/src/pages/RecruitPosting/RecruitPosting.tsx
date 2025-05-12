import { useEffect, useState } from "react";
import RecruitPostForm from "./components/Form/RecruitPostForm";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";
import CoverLetterFormList from "./components/Form/CoverLetterFormList";

const RecruitPosting = () => {
    const [recruitPost, setRecruitPost] = useState<RecruitPostData>({
        postingTitle: "",
        postingPart: "",
        postingType: "",
        postingWorkType: "",
        postingWorkStartTime: null,
        postingWorkEndTime: null,
        postingSal: "",
        postingExperience: "",
        postingEducation: "",
        postingLocation: "",
        postingDeadLine: "",
        postingContent: "",
        postingIsFinish: false,
        postingQuestion: [{ question: "", questionLength: 0 }],
    });

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

    const { mutate } = useMutation({
        mutationFn: (formData: RecruitPostData) =>
            axiosInstance.post(
                "/himatch/application/company/register",
                formData
            ),
        onSuccess: () => {
            toast.success("채용 공고 등록이 완료 되었습니다.");
        },
        onError: () => {
            toast.error("채용 공고 등록에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const isRecruitPostingValid = (post: RecruitPostData): boolean => {
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

    const handleClickPosting = () => {
        mutate(recruitPost);
    };

    return (
        <div className="recruit_posting_wrapper mb-37.5">
            <div className="space-y-12.5">
                <RecruitPostForm
                    recruitPost={recruitPost}
                    setRecruitPost={setRecruitPost}
                />
                <CoverLetterFormList
                    recruitPost={recruitPost}
                    setRecruitPost={setRecruitPost}
                />
            </div>
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="btn-wrapper">
                    <button
                        type="button"
                        className={`h-10 w-25 text-base ${!isRecruitPostingValid(recruitPost) ? "btn-disabled" : "btn-blue"}`}
                        onClick={handleClickPosting}
                        // disabled={!isRecruitPostingValid(recruitPost)}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecruitPosting;

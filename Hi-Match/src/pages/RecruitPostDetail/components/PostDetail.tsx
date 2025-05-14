import { formatDateYMD, formatTime, getDday } from "@/utils/dateFormat";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate, useParams } from "react-router-dom";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon.svg?react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";
import PostDeleteModal from "./PostDeleteModal";
import { useEffect, useState } from "react";

interface PostDetailProps {
    recruitPost: RecruitPostInfo;
}

const PostDetail = ({ recruitPost }: PostDetailProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const editor = useEditor({
        extensions: [StarterKit],
        content: recruitPost.postingContent,
        editable: false, // 읽기 전용으로 설정
    });

    const { postNo } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const handleClickBack = () => {
        navigate(-1);
    };

    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.delete(
                `/himatch/application/company/delete?postingNo=${postNo}`
            ),
        onSuccess: () => {
            toast.success("채용 공고 삭제가 완료되었습니다.");
            navigate("/company/recruit/list");
        },
        onError: () => {
            toast.error("채용 공고 삭제에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const handleClickDelete = () => {
        setIsModalOpen(true);
    };

    const handleClickEdit = () => {
        navigate(`/company/recruit/edit/${postNo}`);
    };

    return (
        <div className="post_detail w-full space-y-12.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            <div className="flex w-full items-center justify-between">
                <div>
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={handleClickBack}
                    >
                        <ArrowLeftIcon className="fill-gray01 h-6 w-6" />
                    </button>
                </div>
                {getDday(recruitPost.postingDeadLine) !== "마감" && (
                    <div className="space-x-4">
                        <button
                            type="button"
                            className="btn-gray h-11 px-4 font-medium text-black"
                            onClick={handleClickDelete}
                        >
                            삭제하기
                        </button>
                        <button
                            type="button"
                            className="btn-white h-11 px-4 font-medium"
                            onClick={handleClickEdit}
                        >
                            수정하기
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    {recruitPost.postingTitle}
                </h3>
                {formatDateYMD(recruitPost.postingDeadLine) === "20991231" ? (
                    <span className="flex-center h-11 rounded-[5px] bg-blue-500 px-4 text-lg font-medium text-white">
                        상시채용
                    </span>
                ) : (
                    <div className="deadline">
                        {getDday(recruitPost.postingDeadLine) === "마감" ? (
                            <span className="flex-center h-11 w-16 rounded-[5px] bg-red-400 text-lg font-semibold text-white">
                                마감
                            </span>
                        ) : (
                            <div className="flex w-47.5 items-center justify-end space-x-2.5">
                                <span className="text-base text-black">
                                    공고 마감까지
                                </span>
                                <span className="flex-center h-11 rounded-[5px] border-1 border-solid border-gray-300 px-4 text-lg font-medium">
                                    {getDday(recruitPost.postingDeadLine)}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 border-y-1 border-solid border-gray-200 px-12.5 py-7.5">
                <div className="space-y-5">
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            경력
                        </span>
                        <span className="font-medium text-black">
                            {recruitPost.postingExperience}
                        </span>
                    </p>
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            학력
                        </span>
                        <span className="font-medium text-black">
                            {recruitPost.postingEducation}
                        </span>
                    </p>
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            근무지
                        </span>
                        <span className="font-medium text-black">
                            {recruitPost.postingLocation}
                        </span>
                    </p>
                </div>
                <div className="space-y-5">
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            급여
                        </span>
                        <span className="font-medium text-black">
                            {recruitPost.postingSal}
                        </span>
                    </p>
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            고용 형태
                        </span>
                        <span className="font-medium text-black">
                            {recruitPost.postingType}
                        </span>
                    </p>
                    <p className="space-x-2.5">
                        <span className="text-gray01 inline-block w-18 font-medium">
                            근무 형태
                        </span>
                        <span className="space-x-2 font-medium text-black">
                            <span>{recruitPost.postingWorkType}</span>
                            {recruitPost.postingWorkType === "정시 출퇴근" && (
                                <span>
                                    {formatTime(
                                        recruitPost.postingWorkStartTime ?? ""
                                    )}
                                    &#126;
                                    {formatTime(
                                        recruitPost.postingWorkEndTime ?? ""
                                    )}
                                </span>
                            )}
                        </span>
                    </p>
                </div>
            </div>
            <div className="space-y-7.5">
                <h4 className="text_black text-lg font-medium">상세 내용</h4>
                <EditorContent
                    editor={editor}
                    className="editor leading-[2] text-black"
                />
            </div>
            <div className="space-y-7.5">
                <h4 className="text_black text-lg font-medium">태그</h4>
                <div className="flex flex-wrap gap-x-2.5 gap-y-4">
                    {(recruitPost.tags ?? []).map((tag, index) => (
                        <span
                            key={index}
                            className="text-gray01 flex h-11 items-center rounded-[5px] border border-solid border-gray-200 bg-white px-5 font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <>
                <PostDeleteModal
                    isOpen={isModalOpen}
                    onDelete={mutate}
                    onClose={() => setIsModalOpen(false)}
                />
            </>
        </div>
    );
};

export default PostDetail;

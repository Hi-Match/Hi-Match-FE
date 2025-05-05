import axiosInstance from "@/apis/axiosInstance";
import { formatDate } from "@/utils/dateFormat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@/assets/icons/menu-icon.svg?react";
import { useEffect, useMemo, useRef, useState } from "react";
import ResumeDeleteModal from "./ResumeDeleteModal";
import CreateResume from "../ResumeWrite/CreateResume";
import toast from "react-hot-toast";

interface ResumeListData {
    resumeDate: string;
    resumeNo: number;
    resumeTitle: string;
}

const ResumeList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [resumeNumber, setResumeNumber] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<number | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = () => {
            if (wrapperRef.current) {
                setIsOpen(null);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // 이력서 목록 가져오기
    const { data } = useQuery<ResumeListData[]>({
        queryKey: ["resume-list"],
        queryFn: async () => {
            const response = await axiosInstance.get("/himatch/resume/list");

            return response.data;
        },
    });

    const isLimit = useMemo(() => {
        return 3 <= (data?.length ?? 0);
    }, [data]);

    // 이력서 상세 조회
    const handleClickResumeDetail = (resumeNo: number) => {
        navigate(`/mypage/resume/${resumeNo}`);
    };

    const handleClickResumeMenu = (
        event: React.MouseEvent<HTMLButtonElement>,
        resumeNo: number
    ) => {
        event.stopPropagation();
        setIsOpen(prev => (prev === resumeNo ? null : resumeNo));
    };

    // 메뉴 밖 클릭 시 Blur
    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
            setIsOpen(null);
        }
    };

    const handleClickResumeEdit = (resumeNo: number) => {
        navigate(`/mypage/resume/edit/${resumeNo}`);
    };

    const handleClickDelete = (resumeNo: number) => {
        setResumeNumber(resumeNo);
        setIsModalOpen(true);
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.delete(
                `/himatch/resume/delete?resumeNo=${resumeNumber}`
            ),
        onSuccess: () => {
            toast.success("이력서가 삭제되었습니다.");
            setIsModalOpen(true);
            queryClient.invalidateQueries({ queryKey: ["resume-list"] });
        },
        onError: () => {
            toast.error("이력서 삭제에 실패했습니다. 다시 시도해 주세요.");
        },
    });

    const handleClickResumeDelete = () => {
        mutate();
    };

    return (
        <div className="resume_list_wrapper">
            <div
                className="resume_list flex items-center space-x-6"
                onBlur={handleBlur}
                tabIndex={0}
                ref={wrapperRef}
            >
                {(data ?? []).map(
                    ({ resumeDate, resumeNo, resumeTitle }: ResumeListData) => (
                        <div key={resumeNo} className="relative h-50 w-75">
                            <div
                                className="resume hover: flex h-full w-full cursor-pointer flex-col justify-between rounded-[10px] border-2 border-solid border-blue-100 bg-white p-7.5 transition-all duration-300 ease-in-out hover:shadow-md"
                                onClick={() =>
                                    handleClickResumeDetail(resumeNo)
                                }
                            >
                                <p className="resume_title text-lg font-medium text-black">
                                    {resumeTitle}
                                </p>
                                <span className="text-gray01 resume_date text-sm">
                                    최종 작성 {formatDate(resumeDate)}
                                </span>
                            </div>
                            {/* 메뉴 */}
                            <div className="menu_wrapper absolute right-4 bottom-5">
                                <button
                                    type="button"
                                    className="cursor-pointer rounded-[5px] p-1 hover:bg-blue-50"
                                    onClick={event =>
                                        handleClickResumeMenu(event, resumeNo)
                                    }
                                >
                                    <MenuIcon className="fill-gray02 h-6 w-4" />
                                </button>
                                {isOpen === resumeNo && (
                                    <div className="resume_menu_wrapper absolute top-10 right-0 z-10">
                                        <ul className="grid-center rounded-[5px] border-1 border-solid border-gray-200 bg-white shadow-sm">
                                            <li>
                                                <span
                                                    className="flex-center h-12.5 w-37.5 cursor-pointer text-base font-medium text-black hover:bg-blue-50"
                                                    onMouseDown={() =>
                                                        handleClickResumeEdit(
                                                            resumeNo
                                                        )
                                                    }
                                                >
                                                    수정
                                                </span>
                                            </li>
                                            <li>
                                                <span
                                                    className="flex-center h-12.5 w-37.5 cursor-pointer text-base font-medium text-red-400 hover:bg-blue-50"
                                                    onMouseDown={() =>
                                                        handleClickDelete(
                                                            resumeNo
                                                        )
                                                    }
                                                >
                                                    삭제
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}
                {!isLimit && <CreateResume />}
            </div>
            <ResumeDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleClickResumeDelete}
            />
        </div>
    );
};

export default ResumeList;

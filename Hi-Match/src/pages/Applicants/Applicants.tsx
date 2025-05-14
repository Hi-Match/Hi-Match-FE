import { useState } from "react";
import ApplicantsForm from "./components/ApplicantsForm";
import ExclamationIcon from "@/assets/icons/exclamation-icon.svg?react";
import { useRecruitStore } from "@/store/recruitStore";
import { useApplicantsAllRejected } from "@/hooks/applicant/useApplicantsAllRejected";
import Modal from "@/components/Modal";
import toast from "react-hot-toast";

const Applicants = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { selectedPostNo } = useRecruitStore();

    const { mutate: receivedRejected } = useApplicantsAllRejected();
    const { mutate: reviewingRejected } = useApplicantsAllRejected();
    const { mutate: resumePassRejected } = useApplicantsAllRejected();

    const handleClickAllRejected = () => {
        setIsModalOpen(true);
    };

    const submitAllRejected = () => {
        receivedRejected(
            { postingNo: Number(selectedPostNo), category: "SUBMIT" },
            {
                onSuccess: () => {
                    toast.success("선택하신 공고가 최종 마감되었습니다.");
                    setIsModalOpen(false);
                },
            }
        );
        reviewingRejected({
            postingNo: Number(selectedPostNo),
            category: "PROGRESS",
        });
        resumePassRejected({
            postingNo: Number(selectedPostNo),
            category: "RESUME_PASS",
        });
    };

    return (
        <div className="applicants w-full space-y-7.5">
            <ApplicantsForm />
            <>
                <Modal
                    isOpen={isModalOpen}
                    title="최종 마감"
                    buttonText="마감하기"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={submitAllRejected}
                >
                    <div className="grid-center space-y-7.5">
                        <ExclamationIcon className="h-25 w-25 fill-red-400" />
                        <p className="mb-7.5 text-xl font-semibold text-black">
                            선택하신 공고를 최종 마감할까요?
                        </p>
                        <p className="text-gray01 text-center text-sm font-medium break-keep">
                            &#91;지원 접수&#93;, &#91;서류 검토&#93;, &#91;서류
                            합격&#93; 목록에 있는 모든 지원자들이 일괄 불합격
                            처리가 되며, 진행 후 변경하실 수 없습니다.
                        </p>
                    </div>
                </Modal>
            </>
            <div className="fixed bottom-0 left-62.5 flex h-15 w-[calc(100%-250px)] items-center justify-end bg-white px-25 shadow-2xl">
                <div className="btn-wrapper">
                    <button
                        type="button"
                        className="btn-blue h-10 w-25 text-base"
                        onClick={handleClickAllRejected}
                    >
                        최종 마감
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Applicants;

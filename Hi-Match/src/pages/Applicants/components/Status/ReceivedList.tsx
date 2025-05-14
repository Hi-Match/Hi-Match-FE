import { useState } from "react";
import ApplicantCard from "./ApplicantCard";
import { useRecruitStore } from "@/store/recruitStore";
import { useApplicantsAllRejected } from "@/hooks/applicant/useApplicantsAllRejected";
import Modal from "@/components/Modal";
import ExclamationIcon from "@/assets/icons/exclamation-icon.svg?react";
import toast from "react-hot-toast";

type Application = {
    applicationNo: number;
    applicationDate: string;
    applicationName: string;
    applicationGrade: number;
    applicationPart: string;
};

interface ReceivedListProps {
    received: Application[];
}

const ReceivedList = ({ received }: ReceivedListProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { selectedPostNo } = useRecruitStore();

    const { mutate } = useApplicantsAllRejected();

    const handleClickAllRejected = () => {
        setIsModalOpen(true);
    };

    const submitAllRejected = () => {
        mutate(
            { postingNo: Number(selectedPostNo), category: "SUBMIT" },
            {
                onSuccess: () => {
                    toast.success(
                        "지원 접수 목록의 지원자들이 불합격 처리되었습니다."
                    );
                    setIsModalOpen(false);
                },
            }
        );
    };

    return (
        <div className="received border-gray03 scroll-custom h-175 min-h-175 space-y-5 overflow-y-auto rounded-[10px] border border-solid bg-white p-5">
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-black">지원 접수</h4>
                <button
                    type="button"
                    className="btn-gray btn-sm text-gray01"
                    onClick={handleClickAllRejected}
                >
                    전체 불합격
                </button>
            </div>
            <div className="space-y-5">
                {received &&
                    received.map((application, index) => (
                        <div key={index} className="applicant_card">
                            <ApplicantCard
                                applicantNo={application.applicationNo}
                                applicantName={application.applicationName}
                                applicantDate={application.applicationDate}
                                applicantGrade={application.applicationGrade}
                                applicantPart={application.applicationPart}
                            />
                        </div>
                    ))}
            </div>
            <>
                <Modal
                    isOpen={isModalOpen}
                    title="지원 접수"
                    buttonText="완료"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={submitAllRejected}
                >
                    <div className="grid-center space-y-7.5">
                        <ExclamationIcon className="h-25 w-25 fill-red-400" />
                        <p className="mb-7.5 text-xl font-semibold text-black">
                            일괄 불합격 처리하시겠습니까?
                        </p>
                        <p className="text-gray01 text-center text-sm font-medium break-keep">
                            현재 목록에 있는 모든 지원자들이 일괄 불합격 처리가
                            되며, 진행 후 변경하실 수 없습니다.
                        </p>
                    </div>
                </Modal>
            </>
        </div>
    );
};

export default ReceivedList;

import Modal from "@/components/Modal";

interface ResumeDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const ResumeDeleteModal = ({
    isOpen,
    onClose,
    onSubmit,
}: ResumeDeleteModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            title="이력서 삭제"
            buttonText="삭제"
            onClose={onClose}
            onSubmit={onSubmit}
        >
            <div className="grid-center">
                <p className="mb-2.5 text-xl font-medium text-black">
                    이력서를 삭제하시겠습니까?
                </p>
                <p className="text-gray01 text-base font-medium">
                    삭제 시, 복구되지 않습니다.
                </p>
            </div>
        </Modal>
    );
};

export default ResumeDeleteModal;

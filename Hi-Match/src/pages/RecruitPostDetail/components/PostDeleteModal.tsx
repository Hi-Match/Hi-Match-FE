import Modal from "@/components/Modal";

interface PostDeleteModalProps {
    isOpen: boolean;
    onDelete: () => void;
    onClose: () => void;
}

const PostDeleteModal = ({
    isOpen,
    onDelete,
    onClose,
}: PostDeleteModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            title="공고 삭제"
            buttonText="삭제하기"
            onClose={onClose}
            onSubmit={onDelete}
        >
            <div className="recruit_post_finish grid-center">
                <p className="mb-7.5 text-xl font-medium text-black">
                    현재 공고를 삭제할까요?
                </p>
                <p className="text-gray01 text-base font-medium">
                    삭제 시, 해당 공고는 복구되지 않습니다.
                </p>
            </div>
        </Modal>
    );
};

export default PostDeleteModal;

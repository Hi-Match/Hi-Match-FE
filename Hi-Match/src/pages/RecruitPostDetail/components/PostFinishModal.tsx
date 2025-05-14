import Modal from "@/components/Modal";

interface PostFinishModalProps {
    isOpen: boolean;
    onFinish: () => void;
    onClose: () => void;
}

const PostFinishModal = ({
    isOpen,
    onFinish,
    onClose,
}: PostFinishModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            title="공고 마감"
            buttonText="마감하기"
            onClose={onClose}
            onSubmit={onFinish}
        >
            <div className="recruit_post_finish grid-center">
                <p className="mb-7.5 text-xl font-medium text-black">
                    현재 공고를 마감할까요?
                </p>
                <p className="text-gray01 text-base font-medium">
                    최종 마감 전까지 채용 진행은 가능합니다.
                </p>
            </div>
        </Modal>
    );
};

export default PostFinishModal;

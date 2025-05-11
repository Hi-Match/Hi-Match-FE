import axiosInstance from "@/apis/axiosInstance";
import Modal from "@/components/Modal";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface MemberOutModalProps {
    isOpen: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

const MemberOutModal = ({
    isOpen,
    onSuccess,
    onClose,
}: MemberOutModalProps) => {
    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.delete("/himatch/company/member/delete"),
        onSuccess: () => {
            localStorage.removeItem("saveBizId");
            useAuthStore.getState().logout();
            onSuccess();
        },
        onError: () => {
            toast.error("회원 탈퇴에 실패하였습니다. 다시 시도해 주세요.");
        },
    });

    const handleSubmitMemberOut = () => {
        mutate();
    };

    return (
        <Modal
            isOpen={isOpen}
            title="회원 탈퇴"
            buttonText="탈퇴하기"
            onClose={onClose}
            onSubmit={handleSubmitMemberOut}
        >
            <div className="member_out_info grid-center">
                <p className="mb-7.5 text-8xl">&#x1F62D;</p>
                <p className="mb-2.5 text-2xl font-medium text-black">
                    정말 탈퇴하시겠습니까?
                </p>
                <p className="text-gray01 text-base font-medium">
                    탈퇴 시, 계정은 삭제되며 복구되지 않습니다.
                </p>
            </div>
        </Modal>
    );
};

export default MemberOutModal;

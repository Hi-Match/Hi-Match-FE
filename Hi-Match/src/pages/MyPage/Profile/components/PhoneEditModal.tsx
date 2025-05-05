import axiosInstance from "@/apis/axiosInstance";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { useUserInfo } from "@/hooks/user/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PhoneEditModalProps {
    isOpen: boolean;
    userPhone: string;
    onClose: () => void;
}

const PhoneEditModal = ({
    isOpen,
    userPhone,
    onClose,
}: PhoneEditModalProps) => {
    const [phone, setPhone] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const { fetchAndStore } = useUserInfo();

    useEffect(() => {
        if (!isOpen) {
            setPhone("");
            setValid(false);
        }
    }, [isOpen]);

    const { mutate } = useMutation({
        mutationFn: (newPhone: string) =>
            axiosInstance.put("/himatch/member/modify-phone", {
                memberPhone: newPhone,
            }),
        onSuccess: () => {
            fetchAndStore();
            toast.success("휴대폰 번호가 변경되었습니다.");
        },
        onError: () => {
            toast.error(
                "휴대폰 번호 변경에 실패하였습니다. 다시 시도해 주세요."
            );
        },
    });

    const handleSubmitEmail = useCallback(() => {
        if (valid) {
            mutate(phone);
            onClose();
        }
    }, [phone, mutate, onClose, valid]);

    return (
        <Modal
            isOpen={isOpen}
            title="휴대폰 번호 변경"
            buttonEnabled={valid}
            buttonText="완료"
            onClose={onClose}
            onSubmit={handleSubmitEmail}
        >
            <div className="input_wrapper space-y-7.5">
                <Input
                    label="현재 휴대폰 번호"
                    id="currentEmail"
                    value={JSON.parse(atob(userPhone))}
                    disabled
                />
                <AuthNumberInput
                    formPhoneNumber={setPhone}
                    setValid={setValid}
                />
            </div>
        </Modal>
    );
};

export default PhoneEditModal;

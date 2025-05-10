import axiosInstance from "@/apis/axiosInstance";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { useBizInfo } from "@/hooks/business/useBizInfo";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PhoneEditModalProps {
    isOpen: boolean;
    BizPhone: string;
    onClose: () => void;
}

const PhoneEditModal = ({ isOpen, BizPhone, onClose }: PhoneEditModalProps) => {
    const [phone, setPhone] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const { fetchAndStoreBiz } = useBizInfo();

    useEffect(() => {
        if (!isOpen) {
            setPhone("");
            setValid(false);
        }
    }, [isOpen]);

    const { mutate } = useMutation({
        mutationFn: (newPhone: string) =>
            axiosInstance.put("/himatch/company/member/modify-phone", {
                memberPhone: newPhone,
            }),
        onSuccess: () => {
            fetchAndStoreBiz();
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
                    value={JSON.parse(atob(BizPhone))}
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

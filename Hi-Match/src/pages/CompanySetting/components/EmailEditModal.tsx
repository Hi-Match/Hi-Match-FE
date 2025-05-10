import axiosInstance from "@/apis/axiosInstance";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal";
import { EMAIL_REGEX } from "@/constants";
import { useBizInfo } from "@/hooks/business/useBizInfo";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EmailEditModalProps {
    isOpen: boolean;
    bizEmail: string;
    onClose: () => void;
}

const EmailEditModal = ({ isOpen, bizEmail, onClose }: EmailEditModalProps) => {
    const [email, setEmail] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const { fetchAndStoreBiz } = useBizInfo();

    useEffect(() => {
        if (!isOpen) {
            setEmail("");
            setValid(false);
            setValidationMessage({
                success: false,
                message: "",
            });
        }
    }, [isOpen]);

    const handleChangeNewEmail = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setEmail(value);

        const isValid = EMAIL_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
            setValid(true);
        } else {
            setValidationMessage({
                success: false,
                message: "이메일의 형식이 올바르지 않습니다.",
            });
        }

        if (bizEmail === value) {
            setValidationMessage({
                success: false,
                message: "이미 등록된 회원님의 이메일입니다.",
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: (newEmail: string) =>
            axiosInstance.put("/himatch/company/member/modify-mail", {
                memberMail: newEmail,
            }),
        onSuccess: () => {
            fetchAndStoreBiz();
            toast.success("이메일이 변경되었습니다.");
        },
        onError: () => {
            toast.error("이메일 변경에 실패하였습니다. 다시 시도해 주세요.");
        },
    });

    const handleSubmitEmail = useCallback(() => {
        if (valid) {
            mutate(email);
            onClose();
        }
    }, [email, mutate, onClose, valid]);

    return (
        <Modal
            isOpen={isOpen}
            title="이메일 변경"
            buttonEnabled={valid}
            buttonText="완료"
            onClose={onClose}
            onSubmit={handleSubmitEmail}
        >
            <div className="input_wrapper space-y-7.5">
                <Input
                    label="현재 이메일"
                    id="currentEmail"
                    value={bizEmail}
                    disabled
                />
                <Input
                    label="새 이메일"
                    id="newEmail"
                    value={email}
                    placeholder="새 이메일을 입력해 주세요."
                    onChange={handleChangeNewEmail}
                    isValid={validationMessage.success}
                    validMessage={validationMessage.message}
                    autoFocus
                />
            </div>
        </Modal>
    );
};

export default EmailEditModal;

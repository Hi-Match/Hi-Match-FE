import Input from "@/components/Input/Input";
import { PASSWORD_REGEX } from "@/constants";
import React, { useCallback, useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Modal from "@/components/Modal";
import PasswordConfirmInput from "@/pages/SignUp/components/PasswordConfirmInput";
import { useUserInfo } from "@/hooks/user/useUserInfo";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface PasswordEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PasswordEditModal = ({ isOpen, onClose }: PasswordEditModalProps) => {
    const [password, setPassword] = useState<string>("");

    const [isViewPassword, setIsViewPassword] = useState<boolean>(false);
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [confirmValid, setConfirmValid] = useState<boolean>(false);

    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const navigate = useNavigate();
    const { fetchAndStore } = useUserInfo();

    useEffect(() => {
        if (!isOpen) {
            setPassword("");
            setPasswordValid(false);
            setConfirmValid(false);
            setValidationMessage({
                success: false,
                message: "",
            });
        }
    }, [isOpen]);

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setPassword(value);

        const isValid = PASSWORD_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
            setPasswordValid(true);
        } else {
            setValidationMessage({
                success: false,
                message:
                    "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&*?)만 사용 가능합니다.",
            });
        }
    };

    const handleTogglePassword = () => {
        setIsViewPassword(!isViewPassword);
    };

    const { mutate } = useMutation({
        mutationFn: async (newPassword: string) => {
            await axiosInstance.put("/himatch/member/modify-pass", {
                memberPass: newPassword,
            });
        },
        onSuccess: () => {
            fetchAndStore();
            toast.success(
                "비밀번호가 변경되었습니다. \n 변경된 비밀번호로 다시 로그인 해 주세요."
            );
            axiosInstance
                .get("/himatch/member/logout")
                .then(() => {
                    useAuthStore.getState().logout();
                    navigate("/login");
                })
                .catch(() => {});
        },
        onError: () => {
            toast.error("비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.");
        },
    });

    const handleSubmitPassword = useCallback(() => {
        if (passwordValid && confirmValid) {
            mutate(password);
            onClose();
        }
    }, [password, mutate, onClose, passwordValid, confirmValid]);

    return (
        <Modal
            isOpen={isOpen}
            title="비밀번호 변경"
            buttonEnabled={passwordValid && confirmValid}
            buttonText="완료"
            onClose={onClose}
            onSubmit={handleSubmitPassword}
        >
            <div className="input_wrapper space-y-2.5">
                <div className="relative">
                    <Input
                        label="새 비밀번호"
                        id="password"
                        type={`${isViewPassword ? "text" : "password"}`}
                        value={password}
                        placeholder="새 비밀번호를 입력해 주세요."
                        maxLength={16}
                        onChange={handleChangePassword}
                        isValid={validationMessage.success}
                        validMessage={validationMessage.message}
                    />
                    {password && (
                        <button
                            type="button"
                            className="absolute top-[47px] right-[15px] cursor-pointer"
                            onClick={handleTogglePassword}
                        >
                            {isViewPassword ? (
                                <IoEyeOutline className="text-gray01 h-6 w-6" />
                            ) : (
                                <IoEyeOffOutline className="text-gray01 h-6 w-6" />
                            )}
                        </button>
                    )}
                </div>
                <PasswordConfirmInput
                    setValid={setConfirmValid}
                    password={password}
                />
            </div>
        </Modal>
    );
};

export default PasswordEditModal;

import Input from "@/components/Input/Input";
import { PASSWORD_REGEX } from "@/constants";
import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface PasswordInputProps {
    formPassword: (val: string) => void;
    setValid: (val: boolean) => void;
}

const PasswordInput = ({ formPassword, setValid }: PasswordInputProps) => {
    const [password, setPassword] = useState<string>("");
    const [isViewPassword, setIsViewPassword] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setPassword(value);
        formPassword(value);
        setValid(false);

        const isValid = PASSWORD_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
            setValid(true);
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

    return (
        <div className="relative">
            <Input
                label="비밀번호"
                id="password"
                type={`${isViewPassword ? "text" : "password"}`}
                value={password}
                placeholder="비밀번호"
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
    );
};

export default PasswordInput;

import Input from "@/components/Input/Input";
import React, { useState } from "react";

interface PasswordConfirmInputProps {
    setValid: (val: boolean) => void;
    password: string;
}

const PasswordConfirmInput = ({
    setValid,
    password,
}: PasswordConfirmInputProps) => {
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: true,
        message: "",
    });

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setPasswordConfirm(value);
        setValid(false);

        if (value.trim() !== "" && value === password) {
            setValidationMessage({
                success: true,
                message: "",
            });
            setValid(true);
        } else {
            setValidationMessage({
                success: false,
                message: "비밀번호가 일치하지 않습니다.",
            });
        }
    };

    return (
        <Input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            maxLength={16}
            onChange={handleChangePassword}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default PasswordConfirmInput;

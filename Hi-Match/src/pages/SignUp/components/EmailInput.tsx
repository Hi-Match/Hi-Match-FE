import Input from "@/components/Input/Input";
import { EMAIL_REGEX } from "@/constants";
import React, { useState } from "react";

interface EmailInputProps {
    formEmail: (val: string) => void;
    setValid: (val: boolean) => void;
}

const EmailInput = ({ formEmail, setValid }: EmailInputProps) => {
    const [email, setEmail] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmail(value);
        formEmail(value);
        setValid(false);

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
    };

    return (
        <Input
            label="이메일"
            id="email"
            type="email"
            value={email}
            placeholder="이메일"
            onChange={handleChangeEmail}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default EmailInput;

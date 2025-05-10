import Input from "@/components/Input/Input";
import { EMAIL_REGEX } from "@/constants";
import { useState } from "react";

interface EmailInputProps {
    email: string;
    onChange: (val: string) => void;
}

const EmailInput = ({ email, onChange }: EmailInputProps) => {
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        onChange(value);

        const isValid = EMAIL_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
        } else {
            setValidationMessage({
                success: false,
                message: "이메일의 형식이 올바르지 않습니다.",
            });
        }
    };

    return (
        <Input
            id="email"
            type="text"
            value={email}
            variant="large"
            placeholder="이메일"
            onChange={handleChangeEmail}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default EmailInput;

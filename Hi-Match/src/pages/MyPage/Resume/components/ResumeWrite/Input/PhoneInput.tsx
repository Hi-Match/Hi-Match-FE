import Input from "@/components/Input/Input";
import { PHONE_REGEX } from "@/constants";
import { useState } from "react";

interface PhoneInputProps {
    phone: string;
    onChange: (val: string) => void;
}

const PhoneInput = ({ phone, onChange }: PhoneInputProps) => {
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        onChange(value);

        const isValid = PHONE_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
        } else {
            setValidationMessage({
                success: false,
                message: "휴대폰 번호의 형식이 올바르지 않습니다.",
            });
        }
    };

    return (
        <Input
            id="phone"
            type="text"
            value={phone}
            variant="large"
            placeholder="'-'제외 11자리"
            onChange={handleChangePhone}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default PhoneInput;

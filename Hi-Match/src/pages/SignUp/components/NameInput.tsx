import Input from "@/components/Input/Input";
import { NAME_REGEX } from "@/constants";
import React, { useState } from "react";

interface NameInputProps {
    label: string;
    formName: (val: string) => void;
    setValid: (val: boolean) => void;
}

const NameInput = ({ label, formName, setValid }: NameInputProps) => {
    const [name, setName] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: true,
        message: "",
    });

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);
        formName(value);
        setValid(false);

        const isValid = NAME_REGEX.test(value);

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
                    "한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)",
            });
        }
    };

    return (
        <Input
            label={label}
            id="name"
            type="text"
            value={name}
            placeholder={label}
            onChange={handleChangeName}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default NameInput;

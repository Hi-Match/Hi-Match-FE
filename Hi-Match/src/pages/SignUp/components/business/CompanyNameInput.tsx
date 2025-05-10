import Input from "@/components/Input/Input";
import React, { useState } from "react";

interface CompanyNameInputProps {
    formName: (val: string) => void;
    setValid: (val: boolean) => void;
}

const CompanyNameInput = ({ formName, setValid }: CompanyNameInputProps) => {
    const [companyName, setCompanyName] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangeCompanyName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setCompanyName(value);
        formName(value);
        setValid(false);

        if (value) {
            setValidationMessage({
                success: true,
                message: "",
            });
            setValid(true);
        } else {
            setValidationMessage({
                success: false,
                message: "기업명을 입력해 주세요.",
            });
        }
    };

    return (
        <Input
            label="기업명"
            id="companyName"
            type="text"
            value={companyName}
            placeholder="기업명"
            onChange={handleChangeCompanyName}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default CompanyNameInput;

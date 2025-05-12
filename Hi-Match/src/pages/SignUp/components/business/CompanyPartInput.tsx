import CategoryInput from "@/components/Input/CategoryInput";
import { COMPANY_PART } from "@/constants";
import { useState } from "react";

interface CompanyPartInputProps {
    formPart: (val: string) => void;
    setValid: (val: boolean) => void;
}

const CompanyPartInput = ({ formPart, setValid }: CompanyPartInputProps) => {
    const [part, setPart] = useState<string>("");

    const handleChangePart = (option: string) => {
        formPart(option);
        setPart(option);
        if (option !== "") {
            setValid(true);
        }
    };

    return (
        <CategoryInput
            label="산업 선택"
            id="companyPart"
            value={part}
            options={COMPANY_PART}
            onChange={option => handleChangePart(option)}
        />
    );
};

export default CompanyPartInput;

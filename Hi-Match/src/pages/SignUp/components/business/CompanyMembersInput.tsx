import CategoryInput from "@/components/Input/CategoryInput";
import { COMPANY_EMPLOYEE } from "@/constants";
import { useState } from "react";

interface CompanyMembersInputProps {
    formMembers: (val: string) => void;
    setValid: (val: boolean) => void;
}

const CompanyMembersInput = ({
    formMembers,
    setValid,
}: CompanyMembersInputProps) => {
    const [members, setMembers] = useState<string>("");

    const handleChangeMembers = (option: string) => {
        formMembers(option);
        setMembers(option);

        if (option !== "") {
            setValid(true);
        }
    };

    return (
        <CategoryInput
            label="직원 수"
            id="companyMembers"
            value={members}
            options={COMPANY_EMPLOYEE}
            onChange={option => handleChangeMembers(option)}
        />
    );
};

export default CompanyMembersInput;

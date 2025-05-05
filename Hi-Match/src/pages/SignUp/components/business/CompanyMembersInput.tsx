import CategoryInput from "@/components/Input/CategoryInput";
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

    const membersOptions = [
        "1~4명",
        "5~10명",
        "11~50명",
        "51~100명",
        "101~300명",
        "301~1000명",
        "1001명~5000명",
        "5001명 이상",
    ];

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
            options={membersOptions}
            onChange={option => handleChangeMembers(option)}
        />
    );
};

export default CompanyMembersInput;

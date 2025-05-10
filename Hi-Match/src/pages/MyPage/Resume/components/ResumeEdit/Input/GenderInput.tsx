import CategoryInput from "@/components/Input/CategoryInput";
import { useEffect, useState } from "react";

interface GenderInputProps {
    gender: string;
    onChange: (value: string) => void;
}

const GenderInput = ({ gender, onChange }: GenderInputProps) => {
    const [selectedGender, setSelectedGender] = useState<string>("");

    const genderOptions = ["남자", "여자"];

    useEffect(() => {
        if (gender === "M") {
            setSelectedGender("남자");
        } else if (gender === "F") {
            setSelectedGender("여자");
        }
    }, [gender]);

    return (
        <CategoryInput
            id="gender"
            select="성별"
            value={selectedGender}
            variant="extraLarge"
            options={genderOptions}
            onChange={option => onChange(option)}
        />
    );
};

export default GenderInput;

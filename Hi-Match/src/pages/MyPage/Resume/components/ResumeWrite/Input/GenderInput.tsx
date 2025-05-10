import CategoryInput from "@/components/Input/CategoryInput";

interface GenderInputProps {
    gender: string;
    onChange: (value: string) => void;
}

const GenderInput = ({ gender, onChange }: GenderInputProps) => {
    const genderOptions = ["남자", "여자"];

    return (
        <CategoryInput
            id="gender"
            select="성별"
            value={gender}
            variant="extraLarge"
            options={genderOptions}
            onChange={option => onChange(option)}
        />
    );
};

export default GenderInput;

import CategoryInput from "@/components/Input/CategoryInput";
import { COMPANY_PART } from "@/constants";

interface IndustryInputProps {
    value: string;
    setIndustry: (val: string) => void;
}

const IndustryInput = ({ value, setIndustry }: IndustryInputProps) => {
    return (
        <div className="industry_input w-full">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                산업 선택
                <span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="industry"
                value={value ?? ""}
                variant="extraLarge"
                options={COMPANY_PART}
                onChange={option => setIndustry(option)}
            />
        </div>
    );
};

export default IndustryInput;

import CategoryInput from "@/components/Input/CategoryInput";
import { COMPANY_PART } from "@/constants";

interface PartInputProps {
    part: string;
    setPart: (val: string) => void;
}

const PartInput = ({ part, setPart }: PartInputProps) => {
    return (
        <div className="part_input w-full">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                직무
                <span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="part"
                value={part ?? ""}
                variant="extraLarge"
                options={COMPANY_PART}
                onChange={option => setPart(option)}
            />
        </div>
    );
};

export default PartInput;

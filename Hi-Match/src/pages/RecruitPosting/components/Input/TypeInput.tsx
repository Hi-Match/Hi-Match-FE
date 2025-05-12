import CategoryInput from "@/components/Input/CategoryInput";
import { EMPLOYMENT_TYPES } from "@/constants/employmentTypes";

interface TypeInputProps {
    type: string;
    setType: (val: string) => void;
}

const TypeInput = ({ type, setType }: TypeInputProps) => {
    const typeOptions = EMPLOYMENT_TYPES.map(type => type.label);

    return (
        <div className="type_input w-full">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                고용 형태
                <span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="type"
                value={type ?? ""}
                variant="extraLarge"
                options={typeOptions}
                onChange={option => setType(option)}
            />
        </div>
    );
};

export default TypeInput;

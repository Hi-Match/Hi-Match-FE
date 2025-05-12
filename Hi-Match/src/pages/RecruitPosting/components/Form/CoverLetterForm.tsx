import CategoryInput from "@/components/Input/CategoryInput";
import { COVER_LETTER_QUESTINONS } from "@/constants";
import { useState } from "react";
import DeleteIcon from "@/assets/icons/delete-icon.svg?react";

interface CoverLetterFormProps {
    index: number;
    length: number;
    onChange: (key: "question" | "length", value: any) => void;
    onRemove?: () => void;
}

const CoverLetterForm = ({
    index,
    length,
    onChange,
    onRemove,
}: CoverLetterFormProps) => {
    const [selectedType, setSelectedType] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedLength, setSelectedLength] = useState(
        length ? String(length) : ""
    );

    const questionTypeOptions = COVER_LETTER_QUESTINONS.map(q => q.label);
    const districtOptions =
        COVER_LETTER_QUESTINONS.find(
            q => q.label === selectedType
        )?.districts.map(d => d.label) ?? [];
    const lengthOptions = ["500", "700", "1000", "1500"];

    return (
        <div className="cover_letter_form space-y-2.5">
            <div className="space-y-2.5">
                <CategoryInput
                    id={`type-${index}`}
                    select="항목 분류"
                    value={selectedType}
                    variant="extraLarge"
                    options={questionTypeOptions}
                    onChange={val => {
                        setSelectedType(val);
                        setSelectedDistrict("");
                        onChange("question", "");
                        onChange("length", 0);
                    }}
                />
                {selectedType && (
                    <CategoryInput
                        id={`question-${index}`}
                        select="질문"
                        value={selectedDistrict}
                        variant="extraLarge"
                        options={districtOptions}
                        onChange={val => {
                            setSelectedDistrict(val);
                            onChange("question", val);
                        }}
                    />
                )}
                {selectedDistrict && (
                    <CategoryInput
                        id={`length-${index}`}
                        select="글자수"
                        value={selectedLength}
                        variant="extraLarge"
                        options={lengthOptions}
                        onChange={val => {
                            setSelectedLength(val);
                            onChange("length", Number(val));
                        }}
                    />
                )}
            </div>
            {onRemove && (
                <div className="delete_btn_wrapper flex justify-end">
                    <button
                        type="button"
                        className="flex-center btn-red cursor-pointer p-2.5 text-red-500"
                        onClick={onRemove}
                    >
                        <DeleteIcon className="h-4 w-4 fill-red-400" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoverLetterForm;

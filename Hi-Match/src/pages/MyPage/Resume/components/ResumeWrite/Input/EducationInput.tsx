import { useState } from "react";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";
import EducationForm from "../Form/EducationForm";

interface EducationInputProps {
    resumeEducation: ResumeEducation[];
    setResumeEducation: React.Dispatch<React.SetStateAction<ResumeEducation[]>>;
}

const EducationInput = ({
    resumeEducation,
    setResumeEducation,
}: EducationInputProps) => {
    const handleAddForm = () => {
        const newEducationData: ResumeEducation = {
            eduTitle: "",
            eduOrgan: "",
            eduTime: "",
            eduStartDate: "",
            eduEndDate: "",
            eduContent: "",
        };

        setResumeEducation(prev => [...prev, newEducationData]);
    };

    const handleRemoveForm = (index: number) => {
        setResumeEducation(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeForm = (index: number, updated: ResumeEducation) => {
        setResumeEducation(prev =>
            prev.map((form, i) => (i === index ? updated : form))
        );
    };

    return (
        <div className="education_wrapper space-y-7.5">
            {resumeEducation.map((data, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <EducationForm
                        data={data}
                        index={index}
                        onChange={updated => handleChangeForm(index, updated)}
                        onRemove={() => handleRemoveForm(index)}
                    />
                </div>
            ))}
            <div className="add_btn_wrapper mt-10">
                <button
                    type="button"
                    className="btn-gray text-gray02 btn-xl flex-center space-x-2.5"
                    onClick={handleAddForm}
                >
                    <PlusIcon className="fill-gray02 h-3 w-3" />
                    <span>추가</span>
                </button>
            </div>
        </div>
    );
};

export default EducationInput;

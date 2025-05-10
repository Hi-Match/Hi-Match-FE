import ExperienceForm from "../Form/ExperienceForm";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";

interface ExperienceInputProps {
    resumeExperience: ResumeExperience[];
    setResumeExperience: React.Dispatch<
        React.SetStateAction<ResumeExperience[]>
    >;
}

const ExperienceInput = ({
    resumeExperience,
    setResumeExperience,
}: ExperienceInputProps) => {
    const handleAddForm = () => {
        const newExperienceData: ResumeExperience = {
            expCompanyName: "",
            expPosition: "",
            expPart: "",
            expAchievement: "",
            expIsCurrent: false,
            expStartDate: "",
            expEndDate: "",
        };

        setResumeExperience(prev => [...prev, newExperienceData]);
    };

    const handleRemoveForm = (index: number) => {
        setResumeExperience(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeForm = (index: number, updated: ResumeExperience) => {
        setResumeExperience(prev =>
            prev.map((form, i) => (i === index ? updated : form))
        );
    };

    return (
        <div className="experience_input_wrapper space-y-7.5">
            {resumeExperience.map((data, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <ExperienceForm
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

export default ExperienceInput;

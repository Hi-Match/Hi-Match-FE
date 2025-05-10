import AwardForm from "../Form/AwardForm";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";

interface AwardInputProps {
    resumeAward: ResumeAward[];
    setResumeAward: React.Dispatch<React.SetStateAction<ResumeAward[]>>;
}

const AwardInput = ({ resumeAward, setResumeAward }: AwardInputProps) => {
    const handleAddForm = () => {
        const newAwardData: ResumeAward = {
            awaTitle: "",
            awaCompetitionName: "",
            awaOrgan: "",
            awaContent: "",
            awaDate: "",
        };

        setResumeAward(prev => [...prev, newAwardData]);
    };

    const handleRemoveForm = (index: number) => {
        setResumeAward(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeForm = (index: number, updated: ResumeAward) => {
        setResumeAward(prev =>
            prev.map((form, i) => (i === index ? updated : form))
        );
    };

    return (
        <div className="award_wrapper space-y-7.5">
            {resumeAward.map((data, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <AwardForm
                        data={data}
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

export default AwardInput;

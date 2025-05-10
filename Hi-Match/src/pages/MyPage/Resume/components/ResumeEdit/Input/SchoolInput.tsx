import SchoolForm from "../Form/SchoolForm";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";

interface SchoolInputProps {
    resumeSchool: ResumeSchool[];
    setResumeSchool: React.Dispatch<React.SetStateAction<ResumeSchool[]>>;
}

const SchoolInput = ({ resumeSchool, setResumeSchool }: SchoolInputProps) => {
    const handleAddForm = () => {
        const newSchoolData: ResumeSchool = {
            schoolName: "",
            schoolMajor: "",
            schoolMinor: "",
            schoolMultiple: "",
            schoolDegree: "",
            schoolGPA: "",
            schoolStandardGPA: "",
            schoolPart: "",
            schoolLev: 0,
            schoolAdmissionDate: "",
            schoolGraduationDate: null,
        };

        setResumeSchool(prev => [...prev, newSchoolData]);
    };

    const handleRemoveForm = (index: number) => {
        setResumeSchool(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeForm = (index: number, updated: ResumeSchool) => {
        setResumeSchool(prev =>
            prev.map((form, i) => (i === index ? updated : form))
        );
    };

    return (
        <div className="school_wrapper space-y-7.5">
            {resumeSchool.map((data, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <SchoolForm
                        data={data}
                        index={index}
                        onChange={updated => handleChangeForm(index, updated)}
                        onRemove={
                            index === 0
                                ? undefined
                                : () => handleRemoveForm(index)
                        }
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

export default SchoolInput;

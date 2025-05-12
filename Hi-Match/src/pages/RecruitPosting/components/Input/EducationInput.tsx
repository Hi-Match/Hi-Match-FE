import CategoryInput from "@/components/Input/CategoryInput";

interface EducationInputProps {
    education: string;
    setEducation: (val: string) => void;
}

const EducationInput = ({ education, setEducation }: EducationInputProps) => {
    const educationOptions = [
        "학력 무관",
        "고졸 이상",
        "학사 이상",
        "석사 이상",
        "박사 이상",
    ];

    return (
        <div className="education_input w-full">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                학력사항
                <span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="education"
                value={education ?? ""}
                variant="extraLarge"
                options={educationOptions}
                onChange={option => setEducation(option)}
            />
        </div>
    );
};

export default EducationInput;

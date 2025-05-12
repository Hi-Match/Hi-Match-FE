import CategoryInput from "@/components/Input/CategoryInput";

interface ExperienceInputProps {
    experience: string;
    setExperience: (val: string) => void;
}

const ExperienceInput = ({
    experience,
    setExperience,
}: ExperienceInputProps) => {
    const experienceOptions = [
        "경력 무관",
        "신입",
        "경력",
        "1년 이상",
        "2년 이상",
        "3년 이상",
        "4년 이상",
        "5년 이상",
        "6년 이상",
        "7년 이상",
        "8년 이상",
        "9년 이상",
        "10년 이상",
    ];

    return (
        <div className="experience_input w-full">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                경력사항
                <span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="experience"
                value={experience ?? ""}
                variant="extraLarge"
                options={experienceOptions}
                onChange={option => setExperience(option)}
            />
        </div>
    );
};

export default ExperienceInput;

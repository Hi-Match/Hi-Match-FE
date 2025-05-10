import CategoryInput from "@/components/Input/CategoryInput";
import DatePicker from "@/components/Input/DatePicker";
import { useEffect } from "react";

interface ArmyInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const ArmyInput = ({ resumeData, setResumeData }: ArmyInputProps) => {
    const armyTypeOptions = ["군필", "미필", "면제"];

    const armyPartOptions = [
        "육군",
        "해군",
        "공군",
        "해병",
        "전경",
        "의경",
        "해경",
        "병역 특례",
        "공익",
        "카투사",
        "의무소방",
        "기타",
    ];

    useEffect(() => {
        if (resumeData.resumeArmyType !== "군필") {
            setResumeData(prev => ({
                ...prev,
                resumeArmyDate: "",
                resumeArmyEnd: "",
                resumeArmyPart: "",
            }));
        }
    }, [resumeData.resumeArmyType, setResumeData]);

    const handleChange = <K extends keyof ResumeDetailData>(
        key: K,
        value: ResumeDetailData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="army_wrapper space-y-7.5">
            <div className="grid grid-cols-2 gap-x-7.5">
                <CategoryInput
                    label="병역 구분"
                    id="armyType"
                    value={resumeData.resumeArmyType ?? ""}
                    variant="extraLarge"
                    options={armyTypeOptions}
                    onChange={option => handleChange("resumeArmyType", option)}
                />
                {resumeData.resumeArmyType === "군필" && (
                    <CategoryInput
                        label="군별"
                        id="armyPart"
                        value={resumeData.resumeArmyPart ?? ""}
                        variant="extraLarge"
                        options={armyPartOptions}
                        onChange={option =>
                            handleChange("resumeArmyPart", option)
                        }
                    />
                )}
            </div>
            {resumeData.resumeArmyType === "군필" && (
                <div className="before:[&>div:last-child]:content grid grid-cols-2 items-end gap-x-7.5">
                    <DatePicker
                        label="복무 기간"
                        select="입대일"
                        onChange={date => handleChange("resumeArmyDate", date)}
                    />
                    <DatePicker
                        select="제대일"
                        onChange={date => handleChange("resumeArmyEnd", date)}
                    />
                </div>
            )}
        </div>
    );
};

export default ArmyInput;

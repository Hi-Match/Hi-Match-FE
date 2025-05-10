import CategoryInput from "@/components/Input/CategoryInput";
import { useEffect, useState } from "react";

interface DisabilityInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const DisabilityInput = ({
    resumeData,
    setResumeData,
}: DisabilityInputProps) => {
    const [isDisability, setIsDisability] = useState<string>("");

    const isDisabilityOption = ["있음", "없음"];

    const disabilityOption = [
        "뇌병변장애",
        "시각장애",
        "청각장애",
        "언어장애",
        "지체장애",
        "정신장애",
        "신장장애",
        "심장장애",
        "간장애",
        "안면장애",
        "자폐성장애",
        "정루, 요루장애",
        "지적장애",
        "호흡기장애",
        "뇌전증장애",
    ];

    const disabilityTypeOption = ["중증(기존1~3급)", "경증(기존4~6급)"];

    useEffect(() => {
        if (isDisability === "없음") {
            setResumeData(prev => ({
                ...prev,
                resumeDisability: "",
                resumeDisabilityType: "",
            }));
        }
    }, [isDisability, setResumeData]);

    const handleChangeIsDisability = (option: string) => {
        setIsDisability(option);
    };

    const handleChange = <K extends keyof ResumeDetailData>(
        key: K,
        value: ResumeDetailData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="disability_wrapper space-y-7.5">
            <div className="grid grid-cols-2 gap-x-7.5">
                <CategoryInput
                    label="장애 여부"
                    id="isDisability"
                    value={isDisability}
                    variant="extraLarge"
                    options={isDisabilityOption}
                    onChange={handleChangeIsDisability}
                />
            </div>
            {isDisability === "있음" && (
                <div className="grid grid-cols-2 gap-x-7.5">
                    <CategoryInput
                        label="장애명"
                        id="disability"
                        value={resumeData.resumeDisability ?? ""}
                        variant="extraLarge"
                        options={disabilityOption}
                        onChange={option =>
                            handleChange("resumeDisability", option)
                        }
                    />
                    <CategoryInput
                        label="장애증상정도"
                        id="disabilityType"
                        value={resumeData.resumeDisabilityType ?? ""}
                        variant="extraLarge"
                        options={disabilityTypeOption}
                        onChange={option =>
                            handleChange("resumeDisabilityType", option)
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default DisabilityInput;

import CategoryInput from "@/components/Input/CategoryInput";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";

interface PatriotismInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const PatriotismInput = ({
    resumeData,
    setResumeData,
}: PatriotismInputProps) => {
    const [patriotism, setPatriotism] = useState<string>("");

    const patriotismOptions = ["대상", "비대상"];

    useEffect(() => {
        if (patriotism === "비대상") {
            setResumeData(prev => ({ ...prev, resumeRewardingPatriotism: "" }));
        }
    }, [patriotism, setResumeData]);

    const handleChangePatriotism = (option: string) => {
        setPatriotism(option);
    };

    const handleChangePatriotNumber = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.replace(/[^0-9\-?]/g, "");

        setResumeData(prev => ({ ...prev, resumeRewardingPatriotism: value }));
    };

    return (
        <div className="patriotism_wrapper">
            <div className="grid grid-cols-2 gap-x-7.5">
                <CategoryInput
                    label="보훈 여부"
                    id="patriotism"
                    value={patriotism}
                    variant="extraLarge"
                    options={patriotismOptions}
                    onChange={handleChangePatriotism}
                />
                {patriotism === "대상" && (
                    <Input
                        label="보훈 번호"
                        id="patriotNumber"
                        value={resumeData.resumeRewardingPatriotism}
                        variant="large"
                        placeholder="보훈 번호"
                        maxLength={20}
                        onChange={handleChangePatriotNumber}
                    />
                )}
            </div>
        </div>
    );
};

export default PatriotismInput;

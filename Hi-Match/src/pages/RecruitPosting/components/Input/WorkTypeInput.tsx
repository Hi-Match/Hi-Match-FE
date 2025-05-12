import CategoryInput from "@/components/Input/CategoryInput";
import { useEffect, useState } from "react";

interface WorkTypeInputProps {
    workType: string;
    setWorkType: (val: string) => void;
    setWorkStartTime: (val: string | null) => void;
    setWorkEndTime: (val: string | null) => void;
}

const WorkTypeInput = ({
    workType,
    setWorkType,
    setWorkStartTime,
    setWorkEndTime,
}: WorkTypeInputProps) => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const workPartOptions = [
        "자율 출퇴근",
        "유연 근무제",
        "재택 근무",
        "정시 출퇴근",
    ];

    const timeOptions = Array.from({ length: 48 }).map((_, index) => {
        const hour = Math.floor(index / 2)
            .toString()
            .padStart(2, "0");
        const minute = index % 2 === 0 ? "00" : "30";

        return `${hour}:${minute}`;
    });

    useEffect(() => {
        if (workType !== "정시 출퇴근") {
            setWorkStartTime(null);
            setWorkEndTime(null);
        }
    }, [setWorkEndTime, setWorkStartTime, workType]);

    return (
        <div className="work_type_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                근무 형태
                <span className="text-red-500"> &#42;</span>
            </p>
            <div className="w-87">
                <CategoryInput
                    id="workType"
                    value={workType ?? ""}
                    variant="large"
                    options={workPartOptions}
                    onChange={option => setWorkType(option)}
                />
            </div>
            {workType === "정시 출퇴근" && (
                <div className="time_input mt-2.5 flex items-center space-x-7.5">
                    <CategoryInput
                        id="startTime"
                        value={startTime ?? ""}
                        select="출근 시간"
                        variant="large"
                        options={timeOptions}
                        onChange={option => {
                            setStartTime(option);
                            setWorkStartTime(option.replace(":", ""));
                        }}
                    />
                    <CategoryInput
                        id="endTime"
                        value={endTime ?? ""}
                        select="퇴근 시간"
                        variant="large"
                        options={timeOptions}
                        onChange={option => {
                            setEndTime(option);
                            setWorkEndTime(option.replace(":", ""));
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default WorkTypeInput;

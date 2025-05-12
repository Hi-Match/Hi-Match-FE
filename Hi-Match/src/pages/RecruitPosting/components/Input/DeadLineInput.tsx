import CategoryInput from "@/components/Input/CategoryInput";
import DatePicker from "@/components/Input/DatePicker";
import { useEffect, useState } from "react";

interface DeadLineInputProps {
    setDeadLine: (val: string) => void;
}

const DeadLineInput = ({ setDeadLine }: DeadLineInputProps) => {
    const [selectedDeadLine, setSelectedDeadLine] = useState<string>("");

    const deadlineOptions = ["상시 채용", "직접 설정"];

    useEffect(() => {
        if (selectedDeadLine === "상시 채용") {
            setDeadLine("20991231");
        }
    }, [selectedDeadLine, setDeadLine]);

    return (
        <div className="deadline_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                마감 기한
                <span className="text-red-500"> &#42;</span>
            </p>
            <div className="flex items-center space-x-7.5">
                <CategoryInput
                    id="selectedDeadLine"
                    value={selectedDeadLine ?? ""}
                    variant="large"
                    options={deadlineOptions}
                    onChange={option => setSelectedDeadLine(option)}
                />

                {selectedDeadLine === "직접 설정" && (
                    <div className="w-full">
                        <DatePicker
                            select="마감기한"
                            onChange={date => setDeadLine(date)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeadLineInput;

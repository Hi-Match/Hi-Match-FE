import CategoryInput from "@/components/Input/CategoryInput";
import DatePicker from "@/components/Input/DatePicker";
import { useEffect, useState } from "react";

interface DeadLineInputProps {
    setDeadLine: (val: string) => void;
    initialDeadLine?: string;
}

const DeadLineInput = ({
    setDeadLine,
    initialDeadLine,
}: DeadLineInputProps) => {
    const deadlineOptions = ["상시 채용", "직접 설정"];

    const [selectedDeadLine, setSelectedDeadLine] = useState("");
    const [customDate, setCustomDate] = useState("");

    // 최초 마운트 시 초기값 설정
    useEffect(() => {
        if (!initialDeadLine) return;

        if (initialDeadLine === "20991231") {
            setSelectedDeadLine("상시 채용");
            setDeadLine("20991231");
        } else {
            setSelectedDeadLine("직접 설정");
            setCustomDate(initialDeadLine);
            setDeadLine(initialDeadLine);
        }
    }, [initialDeadLine, setDeadLine]);

    const handleSelectChange = (option: string) => {
        setSelectedDeadLine(option);
        if (option === "상시 채용") {
            setCustomDate("");
            setDeadLine("20991231");
        } else {
            setDeadLine(customDate); // 직접 설정일 경우 기존 날짜 유지
        }
    };

    const handleDateChange = (date: string) => {
        setCustomDate(date);
        setDeadLine(date);
    };

    return (
        <div className="deadline_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                마감 기한<span className="text-red-500"> &#42;</span>
            </p>
            <div className="flex items-center space-x-7.5">
                <CategoryInput
                    id="selectedDeadLine"
                    value={selectedDeadLine}
                    variant="large"
                    options={deadlineOptions}
                    onChange={handleSelectChange}
                />

                {selectedDeadLine === "직접 설정" && (
                    <div className="w-full">
                        <DatePicker
                            select="마감기한"
                            value={customDate}
                            onChange={handleDateChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeadLineInput;

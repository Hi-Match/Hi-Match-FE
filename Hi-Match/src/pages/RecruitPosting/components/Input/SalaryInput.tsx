import CategoryInput from "@/components/Input/CategoryInput";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";

interface SalaryInputProps {
    salary?: string;
    setSalary: (val: string) => void;
}

const SalaryInput = ({ salary, setSalary }: SalaryInputProps) => {
    const salaryOptions = ["면접 후 결정", "월급", "연봉"];

    const [selectedSalary, setSelectedSalary] = useState("");
    const [money, setMoney] = useState("");
    const [isInitialized, setIsInitialized] = useState(false); // 🔑

    // ✅ 초기에 한 번만 salary 파싱
    useEffect(() => {
        if (isInitialized || !salary) return;

        const matched = salaryOptions.find(option => salary.startsWith(option));
        setSelectedSalary(matched ?? "");
        setMoney(matched ? salary.replace(matched, "").trim() : "");
        setIsInitialized(true); // ✅ 초기화 한 번만
    }, [salary, isInitialized]);

    // ✅ 상태 변화 시 외부 반영
    useEffect(() => {
        if (selectedSalary === "면접 후 결정") {
            setSalary("면접 후 결정");
        } else {
            setSalary(`${selectedSalary} ${money}`);
        }
    }, [selectedSalary, money, isInitialized]);

    const handleChangeMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        setMoney(value);
    };

    return (
        <div className="salary_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                급여
                <span className="text-red-500"> &#42;</span>
            </p>
            <div className="flex items-center space-x-7.5">
                <CategoryInput
                    id="salary"
                    value={selectedSalary}
                    variant="large"
                    options={salaryOptions}
                    onChange={option => setSelectedSalary(option)}
                />
                {selectedSalary !== "" && selectedSalary !== "면접 후 결정" && (
                    <div className="relative w-full">
                        <Input
                            id="money"
                            type="text"
                            value={money}
                            variant="large"
                            placeholder="숫자만 입력"
                            maxLength={5}
                            onChange={handleChangeMoney}
                        />
                        <span className="text-gray02 absolute top-[13px] right-[15px] font-semibold">
                            만원
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryInput;

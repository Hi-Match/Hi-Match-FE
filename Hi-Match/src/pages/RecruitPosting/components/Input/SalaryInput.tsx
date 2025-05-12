import CategoryInput from "@/components/Input/CategoryInput";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";

interface SalaryInputProps {
    setSalary: (val: string) => void;
}

const SalaryInput = ({ setSalary }: SalaryInputProps) => {
    const [selectedSalary, setSelectedSalary] = useState<string>("");
    const [money, setMoney] = useState<string>("");

    const salaryOptions = ["면접 후 결정", "월급", "연봉"];

    useEffect(() => {
        setSalary(`${selectedSalary} ${money}`);
    }, [money, selectedSalary, setSalary]);

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

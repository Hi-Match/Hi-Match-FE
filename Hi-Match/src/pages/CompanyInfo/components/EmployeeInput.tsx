import CategoryInput from "@/components/Input/CategoryInput";
import { COMPANY_EMPLOYEE } from "@/constants";

interface EmployeeInputProps {
    value: string;
    setEmployee: (val: string) => void;
}

const EmployeeInput = ({ value, setEmployee }: EmployeeInputProps) => {
    return (
        <div className="employee_input w-full">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                직원 수<span className="text-red-500"> &#42;</span>
            </p>
            <CategoryInput
                id="employee"
                value={value ?? ""}
                variant="extraLarge"
                options={COMPANY_EMPLOYEE}
                onChange={option => setEmployee(option)}
            />
        </div>
    );
};

export default EmployeeInput;

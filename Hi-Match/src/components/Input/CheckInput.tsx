import { FaCheck } from "react-icons/fa6";

interface CheckInputProps {
    label?: string;
    id: string;
    isChecked: boolean;
    onChange: (val: boolean) => void;
}

const CheckInput = ({ label, id, isChecked, onChange }: CheckInputProps) => {
    const handleCheck = () => {
        onChange(!isChecked);
    };

    return (
        <div className="relative">
            <input
                type="checkbox"
                id={id}
                className="peer hidden"
                checked={isChecked}
                onChange={handleCheck}
            />
            <label
                htmlFor={id}
                className="cursor-pointer pl-8 text-base text-black before:absolute before:top-0 before:left-0 before:h-6 before:w-6 before:rounded-sm before:border before:border-gray-300 before:bg-white peer-checked:before:bg-blue-500"
            >
                {label}
            </label>
            <FaCheck className="pointer-events-none absolute top-1 left-1 hidden h-4 w-4 fill-white peer-checked:block" />
        </div>
    );
};

export default CheckInput;

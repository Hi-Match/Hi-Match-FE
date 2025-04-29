import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface CategoryInputProps {
    label?: string;
    id: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}

const CategoryInput = ({
    label,
    id,
    value,
    options,
    onChange,
}: CategoryInputProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickCategory = () => {
        setIsOpen(prev => !prev);
    };

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="grid-center">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2.5 w-full font-semibold text-black"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={`btn-category btn-lg flex items-center justify-between duration-0 ${value === "" ? "text-gray02" : "text-black"}`}
                    onClick={handleClickCategory}
                    onBlur={() => setIsOpen(false)}
                >
                    {value === "" ? "선택하기" : value}
                    <IoChevronDownOutline className="text-gray01" />
                </button>
                <ul
                    className={`select_category ${isOpen ? "" : "hidden"} absolute top-[49px] left-0 z-10 h-50 w-full overflow-scroll overflow-x-hidden rounded-[5px] border border-solid border-gray-300 bg-white`}
                >
                    {options.map(option => (
                        <li key={option}>
                            <button
                                className={`flex w-full cursor-pointer justify-start p-[15px] hover:bg-gray-100 ${value === option ? "bg-blue-50 font-semibold" : ""}`}
                                onMouseDown={() => handleSelect(option)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryInput;

import { useEffect, useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";

type CategorySize = "small" | "medium" | "large" | "extraLarge";

interface CategoryInputProps {
    label?: string;
    id: string;
    select?: string;
    value: string;
    variant?: CategorySize;
    options: string[];
    onChange: (val: string) => void;
}

const CategoryInput = ({
    label,
    id,
    select = "선택하기",
    value,
    variant = "large",
    options,
    onChange,
}: CategoryInputProps) => {
    const [selected, setSelected] = useState(value);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const categorySize = {
        small: "btn-sm",
        medium: "btn-md",
        large: "btn-lg",
        extraLarge: "btn-xl",
    };

    const handleClickCategory = () => {
        setIsOpen(prev => !prev);
    };

    const handleSelect = (option: string) => {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="category_wrapper">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2.5 inline-block w-full font-semibold text-black"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={`btn-category ${categorySize[variant]} flex items-center justify-between duration-0 ${value === "" ? "text-gray02" : "text-black"}`}
                    onClick={handleClickCategory}
                    onBlur={() => setIsOpen(false)}
                >
                    {selected || select}
                    {isOpen ? (
                        <IoChevronUp className="text-gray01" />
                    ) : (
                        <IoChevronDown className="text-gray01" />
                    )}
                </button>
                <ul
                    className={`select_category ${isOpen ? "" : "hidden"} scroll-custom absolute top-13 left-0 z-10 max-h-50 w-full overflow-x-hidden overflow-y-auto rounded-[5px] border border-solid border-gray-300 bg-white`}
                >
                    {options.map(option => (
                        <li key={option}>
                            <button
                                type="button"
                                className={`flex w-full cursor-pointer justify-start p-[15px] hover:bg-gray-100 ${value === option ? "bg-blue-50 font-medium text-blue-500" : ""}`}
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

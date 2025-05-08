import { useEffect, useRef } from "react";

interface DateSelectProps {
    label: string;
    range: number[];
    value: number;
    isOpen: boolean;
    onChange: (val: number) => void;
}

const DateSelect = ({
    label,
    range,
    value,
    isOpen,
    onChange,
}: DateSelectProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    const selectedRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen && selectedRef.current) {
            selectedRef.current.scrollIntoView({
                block: "center",
                behavior: "auto",
            });
        }
    }, [isOpen]);

    return (
        <div className="flex h-80 w-1/3 flex-col">
            <p className="px-[15px] py-2.5 text-sm text-gray-500">{label}</p>
            <ul
                ref={listRef}
                className="scroll-custom w-full overflow-x-hidden overflow-y-scroll"
            >
                {range.map((date, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            ref={date === value ? selectedRef : null}
                            className={`flex w-full cursor-pointer justify-start px-[15px] py-2.5 hover:bg-gray-100 ${date === value ? "bg-blue-50 font-medium text-blue-500" : ""}`}
                            onClick={() => onChange(date)}
                        >
                            {date}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DateSelect;

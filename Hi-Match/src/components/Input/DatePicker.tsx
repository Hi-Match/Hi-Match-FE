import { useEffect, useRef, useState } from "react";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import DateSelect from "./DateSelect";

interface DatePickerProps {
    label?: string;
    select?: string;
    disabled?: boolean;
    onChange: (val: string) => void;
}

// 윤년 체크
const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (year: number, month: number) => {
    const monthDays = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return monthDays[month - 1];
};

const DatePicker = ({
    label,
    select,
    disabled = false,
    onChange,
}: DatePickerProps) => {
    const current = new Date();

    const [year, setYear] = useState(current.getFullYear());
    const [month, setMonth] = useState(current.getMonth() + 1);
    const [day, setDay] = useState(current.getDate());

    const [isSelected, setIsSelected] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    const [dayOptions, setDayOptions] = useState<number[]>([]);

    const years = Array.from(
        { length: 101 },
        (_, i) => current.getFullYear() - 100 + i
    );
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!select) {
            setIsSelected(true);
        }
    }, [select]);

    useEffect(() => {
        const days = getDaysInMonth(year, month);

        setDayOptions(Array.from({ length: days }, (_, i) => i + 1));

        if (day > days) {
            setDay(days);
        }
    }, [year, month, day]);

    useEffect(() => {
        const formatted = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;

        if (isSelected) {
            onChange(formatted);
        }
    }, [year, month, day, onChange, isSelected]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!wrapperRef.current?.contains(target)) {
                setIsSelectOpen(false);
            }
        };

        if (isSelectOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSelectOpen]);

    const handleClickDate = () => {
        if (disabled) return;
        setIsSelectOpen(!isSelectOpen);
    };

    const handleChangeYear = (selectYear: number) => {
        setYear(selectYear);
        setIsSelected(true);
    };

    const handleChangeMonth = (selectMonth: number) => {
        setMonth(selectMonth);
        setIsSelected(true);
    };

    const handleChangeDay = (selectDay: number) => {
        setDay(selectDay);
        setIsSelected(true);
    };

    return (
        <div className="date_picker_wrapper" ref={wrapperRef}>
            {label && (
                <label
                    htmlFor="date"
                    className="mb-2.5 inline-block w-full font-semibold text-black"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={`btn-category btn-xl flex items-center justify-between duration-0 ${disabled ? "bg-gray-100" : ""} ${isSelected ? "text-black" : "text-gray02"}`}
                    onClick={handleClickDate}
                    disabled={disabled}
                >
                    {isSelected ? `${year}년 ${month}월 ${day}일` : select}
                    {isSelectOpen ? (
                        <IoChevronUp className="text-gray01" />
                    ) : (
                        <IoChevronDown className="text-gray01" />
                    )}
                </button>
                <div
                    className={`flex ${isSelectOpen ? "" : "hidden"} absolute top-13 left-0 z-10 w-full rounded-[5px] border-1 border-solid border-gray-300 bg-white`}
                >
                    <DateSelect
                        label="년(Year)"
                        range={years}
                        value={year}
                        isOpen={isSelectOpen}
                        onChange={handleChangeYear}
                    />
                    <DateSelect
                        label="월(Month)"
                        range={months}
                        value={month}
                        isOpen={isSelectOpen}
                        onChange={handleChangeMonth}
                    />
                    <DateSelect
                        label="일(Day)"
                        range={dayOptions}
                        value={day}
                        isOpen={isSelectOpen}
                        onChange={handleChangeDay}
                    />
                </div>
            </div>
        </div>
    );
};

export default DatePicker;

// GPA 입력용 포매터
export const formatGPA = (val: string | number | undefined | null): string => {
    if (val === undefined || val === null || val === "") return "";

    const num = typeof val === "string" ? parseFloat(val) : val;

    if (isNaN(num)) return "";

    const [intPart, decimalPart] = num.toString().split(".");

    if (!decimalPart || /^0+$/.test(decimalPart)) {
        return `${intPart}.0`;
    }

    return num.toString();
};

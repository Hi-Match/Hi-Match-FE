// ISO 형식 날짜를 YYYY.MM.DD 형식으로 변환
export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};

// ISO 형식 날짜를 YYYYMMDD 형식으로 변환
export const formatDateYMD = (isoDate: string) => {
    if (!isoDate || typeof isoDate !== "string") return isoDate;

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";

    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
};

export const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
};

// YYYY년 MM월 DD일 HH:MM 형식으로 변환
export const formatDeadline = (isoDate: string) => {
    if (!isoDate || typeof isoDate !== "string") return "";

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "";

    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

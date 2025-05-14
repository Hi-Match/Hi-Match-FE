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

    const dateOnly = isoDate.split("T")[0]; // '2099-12-31'
    return dateOnly.replace(/-/g, ""); // '20991231'
};

// 오늘 날짜를 YYYYMMDD 형식으로 return
export const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
};

// HH:MM:SS 형식을 HH:MM 형식으로 변환
export const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");

    return `${hours}:${minutes}`;
};

// ISO 형식 날짜로 디데이 계산
export function getDday(isoDate: string): string {
    const today = new Date();
    const targetDate = new Date(isoDate);

    // 시간 제거 (정확히 날짜만 비교)
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.floor(
        (targetDate.getTime() - today.getTime()) / msPerDay
    );

    if (diff === 0) return "D-Day";
    if (diff > 0) return `D-${diff}`;
    return `마감`;
}

// ISO 형식 날짜를 YYYY.MM.DD 형식으로 변환
export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};

import dayjs from "dayjs";

interface ApplicationTableRowProps {
    item: ApplicationItem;
}

const statusMap: Record<string, string> = {
    SUBMIT: "지원 완료",
    PROGRESS: "서류 검토중",
    RESUME_PASS: "서류 합격",
    FINAL_PASS: "최종 합격",
    FAIL: "불합격",
};

const ApplicationTableRow = ({ item }: ApplicationTableRowProps) => {
    const cellList = [
        item.applicationName,
        item.applicationPart,
        item.applicationContract,
        dayjs(item.applicationDate).format("YYYY.MM.DD HH:mm:ss"),
        statusMap[item.applicationStatus] ?? item.applicationStatus,
    ];

    return (
        <tr>
            {cellList.map((cell, idx) => (
                <td
                    key={idx}
                    className={`border-b border-gray-300 py-2 text-center ${idx !== cellList.length - 1 ? "border-r" : ""}`}
                >
                    {cell}
                </td>
            ))}
        </tr>
    );
};

export default ApplicationTableRow;

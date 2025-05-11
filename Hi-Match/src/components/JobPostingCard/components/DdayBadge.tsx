import dayjs from "dayjs";

interface DdayBadgeProps {
    deadline: string | null | undefined;
}

const DdayBadge = ({ deadline }: DdayBadgeProps) => {
    let text = "확인 안됨";

    if (deadline) {
        const end = dayjs(deadline, "YYYYMMDDTHHmmss");
        if (end.isValid()) {
            const today = dayjs();
            const diff = end.startOf("day").diff(today.startOf("day"), "day");
            text = diff < 0 ? "채용 시 마감" : `D-${diff}`;
        }
    }

    return (
        <span className="absolute top-2 left-2 rounded bg-white/90 px-2 py-1 text-xs font-semibold ">
            {text}
        </span>
    );
};

export default DdayBadge;

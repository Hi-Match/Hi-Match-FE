import { formatDeadline } from "@/utils/dateFormat";

interface DeadlineBannerProps {
    deadline: string;
}

const DeadlineBanner = ({ deadline }: DeadlineBannerProps) => {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">마감일</h2>
            <p className="text-lg font-normal text-blue-500">
                {formatDeadline(deadline)} 까지
            </p>
            <button className="mt-8 w-full rounded-md bg-blue-500 py-3 text-center text-xl font-medium text-white transition-colors hover:bg-blue-600 cursor-pointer">
                지원하기
            </button>
        </div>
    );
};

export default DeadlineBanner;

import { useEffect, useState } from "react";
import { getMemberRecentTestTime } from "@/apis/code";
import dayjs from "dayjs";
import PersonalityReportBox from "./components/PersonalityReportBox";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const RE_TEST_LIMIT_DAYS = 30;

const PersonalityResult = () => {
    const { user } = useUserStore();
    const [lastTestDate, setLastTestDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLastTestDate = async () => {
            setLoading(true);
            try {
                const res = await getMemberRecentTestTime();
                setLastTestDate(res.date ? new Date(res.date) : null);
            } catch (e) {
                console.error(e);
                setLastTestDate(null);
            }
            setLoading(false);
        };
        fetchLastTestDate();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    const now = dayjs();
    const last = lastTestDate ? dayjs(lastTestDate) : null;
    const diff = last ? now.diff(last, "day") : RE_TEST_LIMIT_DAYS + 1;
    const canRetest = diff >= RE_TEST_LIMIT_DAYS;

    return (
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-14 px-15">
            <h2 className="text-3xl font-semibold text-black">
                인성 검사하기 📋
            </h2>
            <div className="flex flex-col gap-4">
                {last ? (
                    <p className="w-full text-center text-lg leading-8 text-black/80">
                        <strong>{user?.memberName}</strong>님의 마지막 검사
                        일자는
                        <b>{last.format("YYYY년 MM월 DD일")}</b>입니다.
                    </p>
                ) : (
                    <p className="w-full text-center text-lg leading-8 text-black/80">
                        <strong>{user?.memberName}</strong>님은 아직 인성 검사를
                        진행하지 않았습니다.
                        <br />
                        아래 버튼을 눌러 인성 검사를 진행하고, 나와 같은
                        인재상을 원하는 기업에 지원해보세요 ☺️
                    </p>
                )}
                {canRetest ? (
                    <>
                        <button className="mx-auto w-fit cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
                            <Link
                                to="/mypage/test"
                                className="w-full text-white"
                            >
                                인성검사 시작하기
                            </Link>
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-center text-lg text-black/80">
                            {RE_TEST_LIMIT_DAYS - diff}일 이후에 재응시
                            가능합니다.
                        </p>
                    </>
                )}
            </div>

            <h2 className="text-3xl font-semibold text-black">
                인성 검사 리포트 📂
            </h2>
            <PersonalityReportBox />
        </div>
    );
};

export default PersonalityResult;

import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const TestBanner = () => {
    const { user } = useUserStore();

    return (
        <>
            <aside className="flex flex-col gap-4">
                {user && (
                    <p className=" text-lg text-black/80">
                        아직 {user?.memberName}님과 인재상이 비슷한 회사가
                        없어요 😢
                    </p>
                )}
                <div className="w-full rounded-lg bg-yellow-100/80 p-8 text-center text-xl">
                    <Link
                        to="/mypage/personality-result"
                        className="flex h-full w-full items-center justify-center gap-5"
                    >
                        <p>
                            <strong className="text-blue-500">인재상</strong>에
                            맞는 공고를 추천 받고 싶다면?
                        </p>
                        <p>인재상 검사하러 가기 →</p>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default TestBanner;

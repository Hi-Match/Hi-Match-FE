import { Link } from "react-router-dom";

const TestBanner = () => (
    <aside className="w-full rounded-lg bg-yellow-100/80 p-8 text-center text-xl">
        <Link
            to="/mypage/personality-result"
            className="flex h-full w-full items-center justify-center gap-5"
        >
            <p>
                <strong className="text-blue-500">인재상</strong>에 맞는 공고를
                추천 받고 싶다면?
            </p>
            <p>인재상 검사하러 가기 →</p>
        </Link>
    </aside>
);

export default TestBanner;

import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/dateFormat";
import UserIcon from "@/assets/icons/User.svg?react";

interface TestResult {
    slogan: string;
    lastDateTime: string;
}

interface PersonalityTestProps {
    code: TestResult;
}

const PersonalityTest = ({ code }: PersonalityTestProps) => {
    const navigate = useNavigate();

    const handleClickPersonalityTest = () => {
        navigate("/mypage/personality-result");
    };

    return (
        <div className="personality_test flex flex-col gap-4">
            <div className="resume_title flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black">인성 검사</h3>
                <span
                    className="flex cursor-pointer items-center"
                    onClick={handleClickPersonalityTest}
                >
                    <span className="text-gray01">전체보기</span>
                    <ArrowRightIcon className="fill-gray02 h-4 w-4" />
                </span>
            </div>
            {code?.slogan ? (
                <ul className="resume_list flex items-center space-x-6">
                    <li className="resume overflow-hidden hover: flex h-50 w-75 cursor-pointer flex-col justify-between rounded-[10px] bg-blue-400 px-7.5 py-5 transition-all duration-300 ease-in-out hover:shadow-md relative">
                        <p className="resume_title text-lg text-white">
                            {code?.slogan || "fds"}
                        </p>

                        <span className="text-sm text-white/80">
                            {formatDate(code?.lastDateTime)}
                        </span>

                        <UserIcon
                            className="absolute right-0 bottom-0 w-[100px] h-[100px] translate-x-1/4 translate-y-1/5 text-white"
                        />
                    </li>
                </ul>
            ) : (
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
            )}
        </div>
    );
};

export default PersonalityTest;

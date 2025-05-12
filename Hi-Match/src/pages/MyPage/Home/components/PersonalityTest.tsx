import ArrowRightIcon from "@/assets/icons/angle-right-icon.svg?react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/dateFormat";

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
        <div className="personality_test">
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
                    <li className="resume hover: flex h-50 w-75 cursor-pointer flex-col justify-between rounded-[10px] border-2 border-solid border-blue-100 bg-white p-7.5 transition-all duration-300 ease-in-out hover:shadow-md">
                        <p className="resume_title text-lg font-black text-black">
                            {code?.slogan || "fds"}
                        </p>
                        
                            <span className="text-gray01 text-sm">
                                {formatDate(code?.lastDateTime)}
                            </span>
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

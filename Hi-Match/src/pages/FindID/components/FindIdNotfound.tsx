import { useLocation, useNavigate } from "react-router-dom";

const FindIdNotfound = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname.split("/")[2];

    const handleClickSignUp = () => {
        navigate(`/signup/${location === "user" ? "user" : "business"}`);
    };

    const handleClickMain = () => {
        navigate("/");
    };

    return (
        <div className="id_notfound_wrapper">
            <div className="mb-12.5 space-y-5">
                <p className="text-center text-lg font-medium text-black">
                    가입된 계정이 없습니다.
                </p>
                <p className="text-gray02 text-center text-base">
                    다른 정보로 다시 시도하시거나 새로 가입해 보세요.
                </p>
            </div>
            <div className="space-x-6">
                <button
                    type="button"
                    className="btn-md btn-white"
                    onClick={handleClickSignUp}
                >
                    회원가입
                </button>
                <button
                    type="button"
                    className="btn-md btn-blue"
                    onClick={handleClickMain}
                >
                    메인으로 가기
                </button>
            </div>
        </div>
    );
};

export default FindIdNotfound;

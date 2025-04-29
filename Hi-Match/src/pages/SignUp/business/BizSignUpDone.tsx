import { useLocation, useNavigate } from "react-router-dom";

const BizSignUpDone = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname.split("/")[2];

    const handleClickLogin = () => {
        navigate("/login", { state: { location } });
    };

    return (
        <div className="sign_up_done_wrapper grid-center">
            <div className="sign_up_container mb-12.5 space-y-5">
                <p className="text-center text-lg font-medium text-black">
                    회원가입이 완료되었습니다.
                </p>
                <p className="text-gray02 text-center text-base">
                    Hi Match에서 새로운 사람들을 채용해 보세요!
                </p>
            </div>
            <div className="btn_wrapper">
                <button
                    type="button"
                    className="btn-lg btn-blue"
                    onClick={handleClickLogin}
                >
                    로그인하기
                </button>
            </div>
        </div>
    );
};

export default BizSignUpDone;

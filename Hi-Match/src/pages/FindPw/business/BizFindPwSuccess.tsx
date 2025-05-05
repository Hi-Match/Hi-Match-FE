import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BizFindPwSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate("/login");
        }
    }, [navigate, state]);

    const handleClickLogin = () => {
        navigate("/login");
    };

    return (
        <div className="pw_reset_wrapper">
            <div className="mb-12.5 space-y-5">
                <p className="text-center text-lg font-medium text-black">
                    회원님의 이메일(
                    <span className="font-medium text-blue-500">{state}</span>
                    )로 임시 비밀번호를 발송하였습니다.
                </p>
                <p className="text-center text-lg font-medium text-black">
                    로그인 후 설정 페이지에서 반드시 비밀번호를 변경해 주세요.
                </p>
            </div>
            <div className="btn_wrapper grid-center">
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

export default BizFindPwSuccess;

import { Link } from "react-router-dom";

const Logout = () => {
    return (
        <div className="auth_wrapper">
            <Link
                to="/login"
                className="text-gray01 mr-3 font-semibold hover:text-blue-500"
            >
                로그인
            </Link>
            <Link
                to="/signup/user"
                className="text-gray01 font-semibold hover:text-blue-500"
            >
                회원가입
            </Link>
        </div>
    );
};

export default Logout;

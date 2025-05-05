import { Link } from "react-router-dom";

const UserAuth = () => {
    return (
        <div className="my-5">
            <Link to="/findid/user" className="text-gray01 text-sm">
                아이디 찾기
            </Link>
            <span className="mx-2.5 text-sm text-gray-300">|</span>
            <Link to="/findpw/user" className="text-gray01 text-sm">
                비밀번호 재설정
            </Link>
            <span className="mx-2.5 text-sm text-gray-300">|</span>
            <Link to="/signup/user" className="text-gray01 text-sm">
                회원가입
            </Link>
        </div>
    );
};

export default UserAuth;

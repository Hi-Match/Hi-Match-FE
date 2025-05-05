import { Link } from "react-router-dom";

const BizAuth = () => {
    return (
        <div className="my-5">
            <Link to="/findid/business" className="text-gray01 text-sm">
                아이디 찾기
            </Link>
            <span className="mx-2.5 text-sm text-gray-300">|</span>
            <Link to="/findpw/business" className="text-gray01 text-sm">
                비밀번호 재설정
            </Link>
            <span className="mx-2.5 text-sm text-gray-300">|</span>
            <Link to="/signup/business" className="text-gray01 text-sm">
                기업 회원가입
            </Link>
        </div>
    );
};

export default BizAuth;

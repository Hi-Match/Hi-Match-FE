import { useFindIdStore } from "@/store/findIdStore";
import { formatDate } from "@/utils/dateFormat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserFindIdSuccess = () => {
    const { findId } = useFindIdStore();

    const navigate = useNavigate();

    const handleClickFindPw = () => {
        navigate("/findpw/user");
    };

    const handleClickLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        if (!findId[0]) {
            navigate("/findid/user/notfound");
        }
    }, [findId, navigate]);

    return (
        <div className="id_list_wrapper grid-center">
            <p className="mb-7.5 text-center text-lg font-medium text-black">
                회원님의 정보와 일치하는 아이디입니다.
            </p>
            <div className="border-gray03 mb-12.5 w-full rounded-[10px] border border-solid py-7.5">
                <ul className="space-y-5">
                    <li>
                        <span className="inline-block w-1/2 text-center font-semibold text-black">
                            아이디
                        </span>
                        <span className="inline-block w-1/2 text-center font-semibold text-black">
                            가입일자
                        </span>
                    </li>
                    {findId.map(({ memberID, memberJoinDate }, index) => (
                        <li key={index} className="user_id_info">
                            <span className="inline-block w-1/2 text-center text-black">
                                {memberID}
                            </span>
                            <span className="inline-block w-1/2 text-center text-black">
                                {formatDate(memberJoinDate)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-x-6">
                <button
                    type="button"
                    className="btn-md btn-white"
                    onClick={handleClickFindPw}
                >
                    비밀번호 재설정
                </button>
                <button
                    type="button"
                    className="btn-md btn-blue"
                    onClick={handleClickLogin}
                >
                    로그인하기
                </button>
            </div>
        </div>
    );
};

export default UserFindIdSuccess;

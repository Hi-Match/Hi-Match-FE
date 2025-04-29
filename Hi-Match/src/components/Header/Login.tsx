import axiosInstance from "@/apis/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [userName, setUserName] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const { user } = useUserStore();

    useEffect(() => {
        setUserName(user?.memberName ?? "");
    }, [user?.memberName]);

    const handleClickProfile = () => {
        setIsOpen(prev => !prev);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
            setIsOpen(false);
        }
    };

    const handleClickLogout = () => {
        axiosInstance
            .get("/himatch/member/logout")
            .then(() => {
                useAuthStore.getState().logout();
                navigate("/");
            })
            .catch(() => {});
    };

    return (
        <div className="mypage_wrapper relative">
            <div
                className="cursor-pointer"
                onClick={handleClickProfile}
                onBlur={handleBlur}
                tabIndex={0}
            >
                <span className="text-gray01 font-semibold">{userName} 님</span>
            </div>
            <div
                className={`${isOpen ? "" : "hidden"} mypage_list_wrapper`}
                ref={wrapperRef}
            >
                <ul
                    className={`grid-center mypage_list absolute top-[41px] left-[50%] translate-x-[-50%] rounded-[5px] border border-solid border-gray-200`}
                >
                    <li>
                        <Link
                            to="/mypage/home"
                            className="flex-center h-12.5 w-37.5 text-base font-medium text-black hover:bg-blue-50"
                        >
                            마이페이지
                        </Link>
                    </li>
                    <li>
                        <span
                            className="flex-center h-12.5 w-37.5 cursor-pointer text-base text-red-400 hover:bg-blue-50"
                            onMouseDown={handleClickLogout}
                        >
                            로그아웃
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Login;

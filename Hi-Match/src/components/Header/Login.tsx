import axiosInstance from "@/apis/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const mypageMenu = [
    { label: "마이페이지", link: "/mypage/home" },
    { label: "이력서", link: "/mypage/resume" },
    { label: "내정보", link: "/mypage/profile" },
];

const Login = () => {
    const [userName, setUserName] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

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
                window.location.href = "/";
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
                    className={`grid-center mypage_list absolute top-12.5 left-[50%] translate-x-[-50%] rounded-[5px] border-1 border-solid border-gray-200 bg-white shadow-sm [&>li:first-child>a]:rounded-t-[5px]`}
                >
                    {mypageMenu.map(({ label, link }, index) => (
                        <li key={index} className="">
                            <Link
                                to={link}
                                className="flex-center h-11 w-30 text-[15px] font-medium text-black hover:bg-blue-50"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}

                    <li>
                        <span
                            className="flex-center h-11 w-30 cursor-pointer rounded-b-[5px] text-[15px] text-red-400 hover:bg-blue-50"
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
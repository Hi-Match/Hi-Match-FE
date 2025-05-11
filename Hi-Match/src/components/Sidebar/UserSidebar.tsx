import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/images/header/logo-header.svg";
import HomeIcon from "@/assets/icons/home-icon.svg?react";
import ResumeIcon from "@/assets/icons/resume-icon.svg?react";
import StarIcon from "@/assets/icons/star-icon.svg?react";
import UserIcon from "@/assets/icons/user-icon.svg?react";
import LogoutIcon from "@/assets/icons/logout-icon.svg?react";
import PersonalityTestIcon from "@/assets/icons/personality-test-icon.svg?react";
import ListIcon from "@/assets/icons/list-icon.svg?react";
import axiosInstance from "@/apis/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const sidebarMenu = [
    { label: "홈", link: "/mypage/home", Icon: HomeIcon },
    { label: "이력서", link: "/mypage/resume", Icon: ResumeIcon },
    { label: "북마크한 공고", link: "/mypage/bookmark", Icon: StarIcon },
    {
        label: "인성 검사",
        link: "/mypage/personality-result",
        Icon: PersonalityTestIcon,
    },
    { label: "내 정보", link: "/mypage/profile", Icon: UserIcon },
    { label: "지원 내역", link: "/mypage/application", Icon: ListIcon },
];

const UserSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPersonalityActive =
        location.pathname.startsWith("/mypage/personality-result") ||
        location.pathname.startsWith("/mypage/test");

    const handleClickLogout = () => {
        axiosInstance
            .get("/himatch/member/logout")
            .then(() => {
                useAuthStore.getState().logout();
                navigate("/");
                toast.success("로그아웃 되었습니다.");
            })
            .catch(() => {});
    };

    return (
        <div className="sidebar_wrapper sticky top-0 left-0 z-99 flex h-screen flex-col justify-between border-r-1 border-solid border-gray-100 bg-white px-[15px] py-7.5">
            <div className="space-y-7.5">
                <div className="himatch_logo flex w-full justify-center">
                    <Link to="/">
                        <img src={logo} alt="Hi Match" />
                    </Link>
                </div>
                <div className="mypage_menu_wrapper">
                    <ul className="space-y-2.5">
                        {sidebarMenu.map(({ label, link, Icon }, index) => {
                            const isActive =
                                label === "인성 검사"
                                    ? isPersonalityActive
                                    : location.pathname.startsWith(link);

                            return (
                                <li key={index}>
                                    <NavLink
                                        to={link}
                                        className={
                                            `flex h-12 w-full items-center rounded-[5px] px-[15px] text-base ` +
                                            (isActive
                                                ? "bg-blue-50 font-semibold text-blue-500"
                                                : "text-gray01 font-medium hover:bg-gray-50")
                                        }
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <Icon
                                            className={`mr-2.5 h-5 w-5 ${
                                                isActive
                                                    ? "fill-blue-500"
                                                    : "fill-gray01"
                                            }`}
                                        />
                                        {label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="logout_wrapper">
                <span
                    className="text-gray01 flex h-12 w-full cursor-pointer items-center rounded-[5px] px-[15px] text-base"
                    onClick={handleClickLogout}
                >
                    <LogoutIcon className="fill-gray01 mr-2.5 h-5 w-5" />
                    로그아웃
                </span>
            </div>
        </div>
    );
};

export default UserSidebar;

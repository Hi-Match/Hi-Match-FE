import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/header/logo-header.svg";
import AnnouncementIcon from "@/assets/icons/announcement-icon.svg?react";
import UserIcon from "@/assets/icons/user-icon.svg?react";
import CompanyIcon from "@/assets/icons/company-icon.svg?react";
import BadgeIcon from "@/assets/icons/badge-icon.svg?react";
import SettingIcon from "@/assets/icons/settings-icon.svg?react";
import LogoutIcon from "@/assets/icons/logout-icon.svg?react";
import axiosInstance from "@/apis/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const recruitMenu = [
    { label: "채용 공고 관리", link: "", Icon: AnnouncementIcon },
    { label: "지원자 관리", link: "", Icon: UserIcon },
];

const companyMenu = [
    { label: "기업 정보 관리", link: "/company/info", Icon: CompanyIcon },
    { label: "인재상 관리", link: "/company/ideal", Icon: BadgeIcon },
    { label: "관리자 설정", link: "/company/setting", Icon: SettingIcon },
];

const BizSidebar = () => {
    const navigate = useNavigate();

    const handleClickLogout = () => {
        axiosInstance
            .get("/himatch/company/member/logout")
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
                    <Link to="/company/home">
                        <img src={logo} alt="Hi Match" />
                    </Link>
                </div>
                <div className="company_menu_wrapper">
                    <p className="text-gray02 px-[15px] text-sm">회사 관리</p>
                    <ul className="space-y-2.5">
                        {companyMenu.map(({ label, link, Icon }, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link}
                                    className={({ isActive }) =>
                                        `flex h-12 w-full items-center rounded-[5px] px-[15px] text-base ${isActive ? "bg-blue-50 font-semibold text-blue-500" : "text-gray01 font-medium hover:bg-gray-50"}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                className={`mr-2.5 h-5 w-5 ${isActive ? "fill-blue-500" : "fill-gray01"}`}
                                            />
                                            {label}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
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

export default BizSidebar;

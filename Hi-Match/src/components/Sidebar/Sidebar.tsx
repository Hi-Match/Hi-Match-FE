import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/header/logo-header.svg";
import HomeIcon from "@/assets/icons/home-icon.svg?react";
import ResumeIcon from "@/assets/icons/resume-icon.svg?react";
import StarIcon from "@/assets/icons/star-icon.svg?react";
import UserIcon from "@/assets/icons/user-icon.svg?react";

const sidebarMenu = [
    { label: "홈", link: "/mypage/home", Icon: HomeIcon },
    { label: "이력서", link: "/mypage/resume", Icon: ResumeIcon },
    { label: "북마크한 공고", link: "/mypage/bookmark", Icon: StarIcon },
    { label: "내 정보", link: "/mypage/profile", Icon: UserIcon },
];

const Sidebar = () => {
    return (
        <div className="sidebar_wrapper z-999 flex h-screen flex-col space-y-7.5 border-r-1 border-solid border-gray-100 px-[15px] py-7.5">
            <div className="himatch_logo flex w-full justify-center">
                <Link to="/">
                    <img src={logo} alt="Hi Match" />
                </Link>
            </div>
            <div className="mypage_menu_wrapper">
                <ul className="space-y-2.5">
                    {sidebarMenu.map(({ label, link, Icon }) => (
                        <li key={link}>
                            <NavLink
                                to={link}
                                className={({ isActive }) =>
                                    `flex h-12 w-full items-center rounded-[5px] px-[15px] text-base ${isActive ? "bg-blue-50 font-semibold text-blue-500" : "text-gray01 font-medium hover:bg-gray-50"}`
                                }
                                onClick={() => window.scrollTo(0, 0)}
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
    );
};

export default Sidebar;

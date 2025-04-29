import { Link } from "react-router-dom";
import logo from "@/assets/images/header/logo-header.svg";
import { IoSearchOutline } from "react-icons/io5";
import { useAuthStore } from "@/store/authStore";
import Login from "./Login";
import Logout from "./Logout";

const Header = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className="sticky top-0 z-999 grid w-full place-items-center border-b-1 border-solid border-gray-200 bg-white">
            <div className="flex h-15 w-[90%] max-w-7xl items-center justify-between">
                <div className="himatch_logo shrink-0">
                    <Link to="/">
                        <img src={logo} alt="Hi Match" className="h-6" />
                    </Link>
                </div>
                <div className="flex items-center justify-between space-x-5">
                    {/* 검색 버튼 */}
                    <div className="search_wrapper">
                        <button className="search_button flex-center h-[42px] w-[42px] cursor-pointer">
                            <IoSearchOutline className="h-7 w-7" />
                        </button>
                    </div>
                    {/* 인증 상태 컴포넌트 */}
                    {isAuthenticated ? <Login /> : <Logout />}
                    <div className="business_wrapper">
                        <button type="button" className="btn-gray px-2.5 py-2">
                            <Link
                                to="/signup/business"
                                className="font-semibold text-black"
                            >
                                기업 서비스
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

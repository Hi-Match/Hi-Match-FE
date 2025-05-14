import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();

        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });

        useUserStore.getState().reset();
        useAuthStore.getState().reset();

        navigate("/login");
    };

    return (
        <div className="auth_wrapper">
            <button
                onClick={handleLogout}
                className="text-gray01 mr-3 font-semibold hover:text-blue-500"
            >
                로그인
            </button>
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

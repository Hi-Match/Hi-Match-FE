import UserSidebar from "@/components/Sidebar/UserSidebar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPageLayout = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="mypage_wrapper flex w-full">
            <nav className="sidebar_wrapper w-62.5">
                <UserSidebar />
            </nav>
            <section className="mypage_content_wrapper relative flex flex-1 justify-center py-25">
                <Outlet />
            </section>
        </div>
    );
};

export default MyPageLayout;

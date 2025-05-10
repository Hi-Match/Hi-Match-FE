import UserSidebar from "@/components/Sidebar/UserSidebar";
import { Outlet } from "react-router-dom";

const MyPageLayout = () => {
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

import BizSidebar from "@/components/Sidebar/BizSidebar";
import { Outlet } from "react-router-dom";

const BizLayout = () => {
    return (
        <div className="biz_wrapper flex h-screen w-full overflow-hidden">
            <nav className="sidebar_wrapper w-62.5">
                <BizSidebar />
            </nav>
            <main className="biz_content_wrapper relative flex w-full flex-1 justify-center bg-[#F4F6FA] p-12.5 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default BizLayout;

import BizSidebar from "@/components/Sidebar/BizSidebar";
import { Outlet } from "react-router-dom";

const BizLayout = () => {
    return (
        <div className="biz_wrapper flex w-full">
            <nav className="sidebar_wrapper w-62.5">
                <BizSidebar />
            </nav>
            <section className="biz_content_wrapper relative flex max-w-417.5 flex-1 justify-center bg-[#F4F6FA] p-12.5">
                <Outlet />
            </section>
        </div>
    );
};

export default BizLayout;

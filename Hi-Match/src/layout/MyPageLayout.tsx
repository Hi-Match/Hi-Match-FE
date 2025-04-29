import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MyPageLayout = () => {
    return (
        <div className="mypage_wrapper grid grid-flow-col">
            <div className="sidebar_wrapper w-62.5">
                <Sidebar />
            </div>
            <div className="w-[calc(100vw-250px)]">
                <Outlet />
            </div>
        </div>
    );
};

export default MyPageLayout;

import Header from "@/components/Header/Header";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="main_wrapper">
            <Header />
            <main className="pt-20">{children}</main>
        </div>
    );
};

export default MainLayout;

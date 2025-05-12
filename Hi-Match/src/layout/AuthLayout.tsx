import { Link, Outlet } from "react-router-dom";
import LogoIcon from "@/assets/images/header/logo-header.svg?react";

const AuthLayout = () => {
    return (
        <div className="grid-center min-h-screen space-y-5 pt-25 pb-50">
            <header className="logo">
                <Link to="/">
                    <LogoIcon className="w-50" />
                </Link>
            </header>
            <main className="min-w-87">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;

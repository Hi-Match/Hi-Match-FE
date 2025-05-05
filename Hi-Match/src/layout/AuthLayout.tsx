import { Link, Outlet } from "react-router-dom";
import logo from "@/assets/images/header/logo-header.svg";

const AuthLayout = () => {
    return (
        <div className="grid-center min-h-screen space-y-5 pt-25 pb-50">
            <header className="logo">
                <Link to="/">
                    <img src={logo} alt="Hi Match" />
                </Link>
            </header>
            <main className="min-w-102">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;

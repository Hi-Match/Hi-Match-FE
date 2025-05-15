import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<"user" | "business">("user");

    const { state } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (state) {
            setActiveTab(state.location);
        }
    }, [state]);

    const handleUserLogin = () => {
        setActiveTab("user");
    };

    const handleBusinessLogin = () => {
        setActiveTab("business");
    };

    return (
        <>
            <h2 className="mb-7.5 text-center text-black">로그인</h2>
            <div className="grid w-[408px] rounded-[10px] border border-solid border-gray-200">
                <ul className="grid w-full grid-cols-2">
                    <li
                        className={`w-full ${activeTab === "user" ? "bg-gray-100" : ""}`}
                    >
                        <div
                            className={`flex-center after:rounded-tr-[10px]after:border-solid relative h-15 w-full cursor-pointer ${activeTab === "user" ? "rounded-t-[10px] bg-white text-black" : "rounded-tl-[10px] rounded-br-[10px] bg-gray-100 text-gray-500"}`}
                            onClick={handleUserLogin}
                        >
                            <span className="text-xl font-semibold">
                                개인회원
                            </span>
                        </div>
                    </li>
                    <li
                        className={`w-full ${activeTab === "business" ? "bg-gray-100" : ""}`}
                    >
                        <div
                            className={`flex-center relative h-15 w-full cursor-pointer ${activeTab === "business" ? "rounded-t-[10px] bg-white text-black" : "rounded-tr-[10px] rounded-bl-[10px] border-solid border-gray-200 bg-gray-100 text-gray-500"}`}
                            onClick={handleBusinessLogin}
                        >
                            <span className="text-xl font-semibold">
                                기업회원
                            </span>
                        </div>
                    </li>
                </ul>
                <div className="flex justify-center rounded-b-[10px] bg-gray-100">
                    <LoginForm user={activeTab} />
                </div>
            </div>
        </>
    );
};

export default LoginPage;

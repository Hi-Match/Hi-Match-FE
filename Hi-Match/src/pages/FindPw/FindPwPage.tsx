import { Outlet, useLocation } from "react-router-dom";

const FindPwPage = () => {
    const location = useLocation().pathname.split("/")[2];

    return (
        <>
            <h2 className="mb-7.5 text-center text-black">
                {location === "user"
                    ? "비밀번호 재설정"
                    : "기업 비밀번호 재설정"}
            </h2>
            <Outlet />
        </>
    );
};

export default FindPwPage;

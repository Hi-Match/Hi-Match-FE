import { Outlet, useLocation } from "react-router-dom";

const FindIdPage = () => {
    const location = useLocation().pathname.split("/")[2];

    return (
        <>
            <h2 className="mb-7.5 text-center text-black">
                {location === "user" ? "아이디 찾기" : "기업 아이디 찾기"}
            </h2>
            <Outlet />
        </>
    );
};

export default FindIdPage;

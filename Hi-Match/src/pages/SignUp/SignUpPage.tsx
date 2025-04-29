import { Outlet, useLocation } from "react-router-dom";

const SignUpPage = () => {
    const location = useLocation().pathname.split("/")[2];

    return (
        <>
            <h2 className="mb-7.5 text-center text-black">
                {location === "user" ? "회원가입" : "기업 회원가입"}
            </h2>
            <Outlet />
        </>
    );
};

export default SignUpPage;

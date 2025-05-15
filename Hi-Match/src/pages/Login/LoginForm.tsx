import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import LoginIdInput from "./components/LoginIdInput";
import LoginPwInput from "./components/LoginPwInput";
import { useUserInfo } from "@/hooks/user/useUserInfo";
import AuthSaveInput from "./components/AuthSaveInput";
import UserAuth from "./components/UserAuth";
import BizAuth from "./components/BizAuth";
import { useBizInfo } from "@/hooks/business/useBizInfo";

interface LoginFormProps {
    user: "user" | "business";
}

const LoginForm = ({ user }: LoginFormProps) => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isId, setIsId] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [validationMessage, setValidationMessage] = useState({
        success: true,
        message: "",
    });

    const navigate = useNavigate();

    const handleChangeId = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.trim();

            setId(value);

            if (0 < value.length) {
                setIsId(true);
            } else {
                setIsId(false);
            }
        },
        []
    );

    const handleChangePassword = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.trim();

            setPassword(value);

            if (0 < value.length) {
                setIsPassword(true);
            } else {
                setIsPassword(false);
            }
        },
        []
    );

    const { fetchAndStore } = useUserInfo();

    const handleUserLogin = async () => {
        const memberInfo = {
            memberID: id,
            memberPass: password,
        };

        await axiosInstance
            .post("/himatch/member/login", memberInfo)
            .then(() => {
                if (isChecked) {
                    localStorage.setItem("saveUserId", id);
                } else {
                    localStorage.removeItem("saveUserId");
                }

                useAuthStore.getState().login(true);
                fetchAndStore();
                setValidationMessage({
                    success: true,
                    message: "",
                });
                navigate("/");
            })
            .catch(() => {
                setValidationMessage({
                    success: false,
                    message: "아이디 또는 비밀번호가 일치하지 않습니다.",
                });
            });
    };

    const { fetchAndStoreBiz } = useBizInfo();

    const handleBusinessLogin = async () => {
        const memberInfo = {
            memberID: id,
            memberPass: password,
        };

        await axiosInstance
            .post("/himatch/company/member/login", memberInfo)
            .then(() => {
                if (isChecked) {
                    localStorage.setItem("saveBizId", id);
                } else {
                    localStorage.removeItem("saveBizId");
                }

                useAuthStore.getState().login(true);
                fetchAndStoreBiz();
                setValidationMessage({
                    success: true,
                    message: "",
                });

                navigate("/company/info");
            })
            .catch(() => {
                setValidationMessage({
                    success: false,
                    message: "아이디 또는 비밀번호가 일치하지 않습니다.",
                });
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user === "user") {
            handleUserLogin();
        } else {
            handleBusinessLogin();
        }
    };

    return (
        <form
            className="login_form grid-center w-full rounded-tr-[10px] rounded-b-[10px] bg-white py-[30px]"
            onSubmit={event => handleSubmit(event)}
        >
            <div className="input_wrapper space-y-2.5">
                <LoginIdInput id={id} onChange={handleChangeId} />
                <LoginPwInput
                    password={password}
                    onChange={handleChangePassword}
                />
            </div>
            <div className="checkbox_ wrapper flex w-full items-center justify-start">
                <AuthSaveInput
                    user={user}
                    setId={setId}
                    setIsId={setIsId}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            </div>
            {!validationMessage.success && (
                <div className="my-1.25 w-full justify-center">
                    <span className="text-sm text-red-400">
                        {validationMessage.message}
                    </span>
                </div>
            )}
            <div className="btn_wrapper mt-7.5">
                <button
                    type="submit"
                    className={`btn-lg ${isId && isPassword ? "btn-blue" : "btn-disabled"}`}
                    disabled={isId && isPassword ? false : true}
                >
                    로그인
                </button>
            </div>
            {user === "user" ? <UserAuth /> : <BizAuth />}
        </form>
    );
};

export default LoginForm;

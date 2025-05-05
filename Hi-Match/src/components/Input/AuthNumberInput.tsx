import React, { useState } from "react";
import Input from "./Input";
import { AUTHCODE_REGEX, PHONE_REGEX } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import AuthTimer from "./AuthTimer";

interface AuthNumberInputProps {
    formPhoneNumber: (val: string) => void;
    setValid: (val: boolean) => void;
}

const AuthNumberInput = ({
    formPhoneNumber,
    setValid,
}: AuthNumberInputProps) => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [authNumber, setAuthNumber] = useState<string>("");
    const [confirmAuthNumber, setConfirmAuthNumber] = useState<string>("");
    const [sendText, setSendText] = useState<string>("인증 요청");

    const [timerTigger, setTimerTigger] = useState<number>(0);

    const [enabledAuthNumber, setEnabledAuthNumber] = useState(false);
    const [validAuthNumber, setValidAuthNumber] = useState<boolean>(false);
    const [authCompleted, setAuthCompleted] = useState<boolean>(false);

    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });
    const [authMessage, setAuthMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        setPhoneNumber(value);
        formPhoneNumber(value);
        setValid(false);

        const isValid = PHONE_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
        } else {
            setValidationMessage({
                success: false,
                message: "휴대폰 번호의 형식이 올바르지 않습니다.",
            });
        }
    };

    // 인증 번호 API 호출
    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.post("/himatch/member/phone", {
                memberPhone: phoneNumber,
            }),
        onSuccess: data => {
            const authNumber = data.data.authenticationNumber;

            if (data.status === 200) {
                setAuthMessage({
                    success: true,
                    message: "인증 번호가 전송되었습니다.",
                });
                setConfirmAuthNumber(authNumber);
                setTimerTigger(prev => prev + 1);
            } else {
                setAuthMessage({
                    success: false,
                    message: "이미 사용중인 전화번호입니다.",
                });
            }
        },
        onError: () => {
            setAuthCompleted(true);
            setAuthMessage({
                success: false,
                message: "잠시 후 다시 시도해 주세요.",
            });
        },
    });

    const buttonHandler = {
        buttonEnabled: validationMessage.success,
        buttonText: sendText,
        onClick: () => {
            setSendText("재전송");
            setEnabledAuthNumber(true);
            setAuthCompleted(false);
            mutate();
        },
    };

    const handleChangeAuth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        setAuthNumber(value);

        const isValid = AUTHCODE_REGEX.test(value);

        if (isValid) {
            setValidAuthNumber(true);
        } else {
            setValidAuthNumber(false);
        }
    };

    // 인증 번호 확인
    const checkAuthNumber = () => {
        if (confirmAuthNumber === authNumber) {
            setAuthMessage({
                success: true,
                message: "인증이 완료되었습니다.",
            });
            setValid(true);
            setAuthCompleted(true);
        } else {
            setAuthMessage({
                success: false,
                message: "올바르지 않은 인증 번호입니다. 다시 확인해 주세요.",
            });
        }
    };

    // 인증 번호 시간 만료
    const handleExpire = () => {
        setAuthMessage({
            success: false,
            message: "인증 시간이 만료되었습니다. 다시 인증해 주세요.",
        });
        setAuthCompleted(false);
    };

    return (
        <div className="grid-center space-y-2.5">
            <Input
                label="휴대폰 번호"
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                placeholder="'-'제외 11자리"
                maxLength={11}
                onChange={handleChangePhone}
                buttonHandler={buttonHandler}
                isValid={validationMessage.success}
                validMessage={validationMessage.message}
            />
            <div className="relative">
                <input
                    className={`input input-sm ${enabledAuthNumber ? "" : "bg-gray-100"} ${!authMessage.success && authMessage.message ? "input-fail" : ""}`}
                    id="authNumber"
                    type="text"
                    value={authNumber}
                    placeholder="인증번호 6자리"
                    maxLength={6}
                    onChange={handleChangeAuth}
                    disabled={enabledAuthNumber ? false : true}
                />
                {enabledAuthNumber && (
                    <button
                        type="button"
                        className={`absolute top-[13px] right-[15px] bg-transparent text-base font-semibold ${authNumber && authNumber.length && validAuthNumber ? "cursor-pointer text-blue-500" : "text-gray02"}`}
                        onClick={checkAuthNumber}
                    >
                        확인
                    </button>
                )}
                {authMessage.message && (
                    <div
                        className={`mt-1.25 flex w-full flex-col justify-start gap-0 text-left ${25 < authMessage.message.length ? "flex-col" : "flex-row"}`}
                    >
                        <span
                            className={`mr-[5px] text-sm ${authMessage.success ? "text-green-500" : "text-red-400"}`}
                        >
                            {authMessage.message}
                        </span>
                        {!authCompleted && (
                            <AuthTimer
                                duration={180}
                                onExpire={handleExpire}
                                trigger={timerTigger}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthNumberInput;

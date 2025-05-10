import axiosInstance from "@/apis/axiosInstance";
import Input from "@/components/Input/Input";
import { ID_REGEX } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface IdInputProps {
    user: string;
    formID: (val: string) => void;
    setValid: (val: boolean) => void;
}

const IdInput = ({ user, formID, setValid }: IdInputProps) => {
    const [id, setId] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: false,
        message: "",
    });

    const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setId(value);
        formID(value);
        setValid(false);

        const isValid = ID_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
        } else {
            setValidationMessage({
                success: false,
                message: "아이디는 4~20자의 영문과 숫자만 사용 가능합니다.",
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: () => {
            const path =
                user === "user"
                    ? "/himatch/member/idcheck"
                    : "/himatch/company/member/idcheck";

            return axiosInstance.get(`${path}?memberID=${id}`);
        },
        onSuccess: data => {
            if (data.status === 200 && data.data) {
                setValidationMessage({
                    success: true,
                    message: "사용 가능한 아이디입니다.",
                });
                setValid(true);
            } else {
                setValidationMessage({
                    success: false,
                    message: "이미 사용중인 아이디입니다.",
                });
            }
        },
        onError: () => {
            setValidationMessage({
                success: false,
                message: "잠시 후 다시 시도해 주세요.",
            });
        },
    });

    const buttonHandler = {
        buttonEnabled: validationMessage.success,
        buttonText: "중복 확인",
        onClick: mutate,
    };

    return (
        <Input
            label="아이디"
            id="id"
            type="text"
            value={id}
            placeholder="아이디"
            maxLength={20}
            onChange={handleChangeId}
            buttonHandler={buttonHandler}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default IdInput;

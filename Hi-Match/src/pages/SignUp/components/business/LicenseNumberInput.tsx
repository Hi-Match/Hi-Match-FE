import axiosInstance from "@/apis/axiosInstance";
import Input from "@/components/Input/Input";
import { LICENSENUMBER_REGEX } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface LicenseNumberInputProps {
    formNumber: (val: string) => void;
    setValid: (val: boolean) => void;
}

const LicenseNumberInput = ({
    formNumber,
    setValid,
}: LicenseNumberInputProps) => {
    const [licenseNumber, setLicenseNumber] = useState<string>("");
    const [validationMessage, setValidationMessage] = useState({
        success: true,
        message: "",
    });

    const handleChangeLicenseNumber = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        setLicenseNumber(value);
        formNumber(value);
        setValid(false);

        const isValid = LICENSENUMBER_REGEX.test(value);

        if (isValid) {
            setValidationMessage({
                success: true,
                message: "",
            });
        } else {
            setValidationMessage({
                success: false,
                message: "사업자 등록번호를 입력해 주세요",
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: () =>
            axiosInstance.post("/himatch/company/member/license", {
                licenseNumber: licenseNumber,
            }),
        onSuccess: data => {
            if (data.status === 200 && data.data) {
                setValidationMessage({
                    success: true,
                    message: "인증되었습니다.",
                });
                setValid(true);
            } else {
                setValidationMessage({
                    success: false,
                    message: "유효하지 않은 사업자등록번호입니다.",
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
        buttonText: "인증하기",
        onClick: mutate,
    };

    return (
        <Input
            label="사업자등록번호"
            id="licenseNumber"
            type="text"
            value={licenseNumber}
            placeholder="'-'제외 10자리"
            maxLength={10}
            onChange={handleChangeLicenseNumber}
            buttonHandler={buttonHandler}
            isValid={validationMessage.success}
            validMessage={validationMessage.message}
        />
    );
};

export default LicenseNumberInput;

import axiosInstance from "@/apis/axiosInstance";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import Input from "@/components/Input/Input";
import { ID_REGEX, NAME_REGEX } from "@/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BizFindPwForm = () => {
    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [isId, setIsId] = useState<boolean>(false);
    const [isName, setIsName] = useState<boolean>(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);

    const [idValidation, setIdValidation] = useState({
        success: false,
        message: "",
    });
    const [nameValidation, setNameValidation] = useState({
        success: false,
        message: "",
    });

    const navigate = useNavigate();

    const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setId(value);

        const isValid = ID_REGEX.test(value);

        if (isValid) {
            setIdValidation({
                success: true,
                message: "",
            });
            setIsId(true);
        } else {
            setIdValidation({
                success: false,
                message: "아이디는 4~20자의 영문과 숫자만 사용 가능합니다.",
            });
        }
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);

        const isValid = NAME_REGEX.test(value);

        if (isValid) {
            setNameValidation({
                success: true,
                message: "",
            });
            setIsName(true);
        } else {
            setNameValidation({
                success: false,
                message:
                    "한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)",
            });
        }
    };

    const handleSubmitFindPw = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const memberInfo = {
            memberID: id,
            memberName: name,
            memberPhone: phoneNumber,
        };

        axiosInstance
            .post("/himatch/company/member/pwfind", memberInfo)
            .then(response => {
                console.log(response.data);
                navigate("/findpw/business/reset", {
                    state: response.data.memberMail,
                });
            })
            .catch(() => {});
    };

    return (
        <div className="pw_form_wrapper grid-center">
            <form
                className="user_find_pw_form space-y-12.5"
                onSubmit={handleSubmitFindPw}
            >
                <div className="space-y-7.5">
                    <Input
                        label="아이디"
                        id="id"
                        type="text"
                        value={id}
                        placeholder="아이디"
                        onChange={handleChangeId}
                        isValid={idValidation.success}
                        validMessage={idValidation.message}
                    />
                    <Input
                        label="담당자명"
                        id="name"
                        type="text"
                        value={name}
                        placeholder="담당자명"
                        onChange={handleChangeName}
                        isValid={nameValidation.success}
                        validMessage={nameValidation.message}
                    />
                    <AuthNumberInput
                        formPhoneNumber={(newPhone: string) =>
                            setPhoneNumber(newPhone)
                        }
                        setValid={(valid: boolean) => setIsPhoneNumber(valid)}
                    />
                </div>
                <div className="btn_wrapper">
                    <button
                        type="submit"
                        className={`btn-lg ${isPhoneNumber && isName && isId ? "btn-blue" : "btn-disabled"}`}
                        disabled={
                            isPhoneNumber && isName && isId ? false : true
                        }
                    >
                        비밀번호 재설정
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BizFindPwForm;

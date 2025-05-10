import React, { useState } from "react";
import IdInput from "../components/IdInput";
import PasswordInput from "../components/PasswordInput";
import PasswordConfirmInput from "../components/PasswordConfirmInput";
import EmailInput from "../components/EmailInput";
import NameInput from "../components/NameInput";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import UserAgreementForm from "../components/UserAgreementForm";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";

const UserSignUpForm = () => {
    const [form, setForm] = useState<SignUpForm>({
        id: "",
        password: "",
        name: "",
        email: "",
        phone: "",
    });

    const [validation, setValidation] = useState<ValidState>({
        isId: false,
        isPassword: false,
        isPasswordConfirm: false,
        isName: false,
        isEmail: false,
        isPhone: false,
    });

    const [checkList, setCheckList] = useState<UserAgreementState>({
        all: false,
        age: false,
        use: false,
        personal: false,
    });

    const navigate = useNavigate();

    // form 업데이트 함수
    const updateForm = (key: keyof SignUpForm, value: string) => {
        setForm(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    // validState 업데이트 함수
    const updateValid = (key: keyof ValidState, value: boolean) => {
        setValidation(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    const buttonEnabled =
        Object.values(validation).every(Boolean) &&
        Object.values(checkList).every(Boolean);

    const handleSubmitSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const memberInfo = {
            memberID: form.id,
            memberPass: form.password,
            memberName: form.name,
            memberMail: form.email,
            memberPhone: form.phone,
        };

        if (
            Object.values(validation).every(Boolean) &&
            Object.values(checkList).every(Boolean)
        ) {
            axiosInstance
                .post("/himatch/member/signup", memberInfo)
                .then(() => {
                    navigate("/signup/user/done");
                })
                .catch(() => {});
        }
    };

    return (
        <form
            className="sign_up_form w-87 space-y-12.5"
            onSubmit={handleSubmitSignUp}
        >
            <div className="input_wrapper space-y-7.5">
                <IdInput
                    user="user"
                    formID={(newId: string) => updateForm("id", newId)}
                    setValid={(valid: boolean) => updateValid("isId", valid)}
                />
                <div className="password_wrapper w-full space-y-2.5">
                    <PasswordInput
                        formPassword={(newPw: string) =>
                            updateForm("password", newPw)
                        }
                        setValid={(valid: boolean) =>
                            updateValid("isPassword", valid)
                        }
                    />
                    <PasswordConfirmInput
                        setValid={(valid: boolean) =>
                            updateValid("isPasswordConfirm", valid)
                        }
                        password={form.password}
                    />
                </div>
                <NameInput
                    label="이름"
                    formName={(newName: string) => updateForm("name", newName)}
                    setValid={(valid: boolean) => updateValid("isName", valid)}
                />
                <EmailInput
                    formEmail={(newEmail: string) =>
                        updateForm("email", newEmail)
                    }
                    setValid={(valid: boolean) => updateValid("isEmail", valid)}
                />
                <AuthNumberInput
                    formPhoneNumber={(newPhone: string) =>
                        updateForm("phone", newPhone)
                    }
                    setValid={(valid: boolean) => updateValid("isPhone", valid)}
                />
            </div>
            <UserAgreementForm
                checkList={checkList}
                setCheckList={setCheckList}
            />
            <div className="btn_wrapper">
                <button
                    type="submit"
                    className={`btn-lg ${buttonEnabled ? "btn-blue" : "btn-disabled"}`}
                    disabled={buttonEnabled ? false : true}
                >
                    가입하기
                </button>
            </div>
        </form>
    );
};

export default UserSignUpForm;

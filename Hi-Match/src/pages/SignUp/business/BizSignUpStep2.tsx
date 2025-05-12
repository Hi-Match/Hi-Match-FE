import React from "react";
import IdInput from "../components/IdInput";
import PasswordInput from "../components/PasswordInput";
import PasswordConfirmInput from "../components/PasswordConfirmInput";
import EmailInput from "../components/EmailInput";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import BizAgreementForm from "../components/business/BizAgreementForm";
import NameInput from "../components/NameInput";

interface BizSignUpStep2Props {
    bizForm: BizForm;
    setBizForm: React.Dispatch<React.SetStateAction<BizForm>>;
    bizCheckList: BizAgreementState;
    setBizCheckList: React.Dispatch<React.SetStateAction<BizAgreementState>>;
    bizValidation: BizValidState;
    setBizValidation: React.Dispatch<React.SetStateAction<BizValidState>>;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const BizSignUpStep2 = ({
    bizForm,
    setBizForm,
    bizCheckList,
    setBizCheckList,
    bizValidation,
    setBizValidation,
    onSubmit,
}: BizSignUpStep2Props) => {
    // form 업데이트 함수
    const updateForm = (key: keyof BizForm, value: string) => {
        setBizForm(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    // validState 업데이트 함수
    const updateValid = (key: keyof BizValidState, value: boolean) => {
        setBizValidation(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    const buttonEnabled =
        Object.values(bizValidation).every(Boolean) &&
        Object.values(bizCheckList).every(Boolean);

    return (
        <form className="sign_up_form space-y-12.5" onSubmit={onSubmit}>
            <div className="input_wrapper space-y-7.5">
                <IdInput
                    user="business"
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
                        password={bizForm.password}
                    />
                </div>
                <NameInput
                    label="담당자명"
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
            <BizAgreementForm
                checkList={bizCheckList}
                setCheckList={setBizCheckList}
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

export default BizSignUpStep2;

import React from "react";
import CompanyMembersInput from "../components/business/CompanyMembersInput";
import CompanyNameInput from "../components/business/CompanyNameInput";
import LicenseNumberInput from "../components/business/LicenseNumberInput";
import CompanyPartInput from "../components/business/CompanyPartInput";

interface BizSignUpStep1Props {
    setCompanyForm: React.Dispatch<React.SetStateAction<CompanyForm>>;
    companyValidation: CompanyValidState;
    setCompanyValidation: React.Dispatch<
        React.SetStateAction<CompanyValidState>
    >;
    onNext: () => void;
}

const BizSignUpStep1 = ({
    setCompanyForm,
    companyValidation,
    setCompanyValidation,
    onNext,
}: BizSignUpStep1Props) => {
    // form 업데이트 함수
    const updateForm = (key: keyof CompanyForm, value: string) => {
        setCompanyForm(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    // validState 업데이트 함수
    const updateValid = (key: keyof CompanyValidState, value: boolean) => {
        setCompanyValidation(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    };

    const buttonEnabled = Object.values(companyValidation).every(Boolean);

    return (
        <div className="sign_up_wrapper grid-center">
            <form className="space-y-12.5">
                <div className="space-y-7.5">
                    <CompanyNameInput
                        formName={(name: string) =>
                            updateForm("companyName", name)
                        }
                        setValid={(valid: boolean) =>
                            updateValid("isCompanyName", valid)
                        }
                    />
                    <LicenseNumberInput
                        formNumber={(number: string) =>
                            updateForm("licenseNumber", number)
                        }
                        setValid={(valid: boolean) =>
                            updateValid("isLicenseNumber", valid)
                        }
                    />
                    <CompanyPartInput
                        formPart={(part: string) =>
                            updateForm("companyPart", part)
                        }
                        setValid={(valid: boolean) =>
                            updateValid("isCompanyPart", valid)
                        }
                    />
                    <CompanyMembersInput
                        formMembers={(members: string) =>
                            updateForm("companyMembers", members)
                        }
                        setValid={(valid: boolean) =>
                            updateValid("isCompanyMembers", valid)
                        }
                    />
                </div>
                <div className="btn_wrapper">
                    <button
                        type="button"
                        className={`btn-lg ${buttonEnabled ? "btn-blue" : "btn-disabled"}`}
                        onClick={onNext}
                        disabled={buttonEnabled ? false : true}
                    >
                        계속하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BizSignUpStep1;

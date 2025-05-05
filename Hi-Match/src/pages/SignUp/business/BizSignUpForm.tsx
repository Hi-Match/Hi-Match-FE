import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BizSignUpStep1 from "./BizSignUpStep1";
import BizSignUpStep2 from "./BizSignUpStep2";
import axiosInstance from "@/apis/axiosInstance";

const BizSignUpForm = () => {
    const [step, setStep] = useState(1);

    const [companyForm, setCompanyForm] = useState<CompanyForm>({
        companyName: "",
        licenseNumber: "",
        companyPart: "",
        companyMembers: "",
    });

    const [bizForm, setBizForm] = useState<BizForm>({
        id: "",
        password: "",
        name: "",
        email: "",
        phone: "",
    });

    const [companyValidation, setCompanyValidation] =
        useState<CompanyValidState>({
            isCompanyName: false,
            isLicenseNumber: false,
            isCompanyPart: false,
            isCompanyMembers: false,
        });

    const [bizValidation, setBizValidation] = useState<BizValidState>({
        isId: false,
        isPassword: false,
        isPasswordConfirm: false,
        isName: false,
        isEmail: false,
        isPhone: false,
    });

    const [checkList, setCheckList] = useState<BizAgreementState>({
        all: false,
        use: false,
        business: false,
    });

    const navigate = useNavigate();

    const handleSubmitSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const memberInfo = {
            companyName: companyForm.companyName,
            licenseNumber: companyForm.licenseNumber,
            companyPart: companyForm.companyPart,
            companyCount: companyForm.companyMembers,
            memberID: bizForm.id,
            memberPass: bizForm.password,
            memberName: bizForm.name,
            memberMail: bizForm.email,
            memberPhone: bizForm.phone,
        };

        if (
            Object.values(companyValidation).every(Boolean) &&
            Object.values(bizValidation).every(Boolean)
        ) {
            axiosInstance
                .post("/himatch/company/member/signup", memberInfo)
                .then(() => {
                    navigate("/signup/business/done");
                })
                .catch(() => {});
        }
    };

    return (
        <>
            {step === 1 && (
                <BizSignUpStep1
                    setCompanyForm={setCompanyForm}
                    companyValidation={companyValidation}
                    setCompanyValidation={setCompanyValidation}
                    onNext={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <BizSignUpStep2
                    bizForm={bizForm}
                    setBizForm={setBizForm}
                    bizCheckList={checkList}
                    setBizCheckList={setCheckList}
                    bizValidation={bizValidation}
                    setBizValidation={setBizValidation}
                    onSubmit={handleSubmitSignUp}
                />
            )}
        </>
    );
};

export default BizSignUpForm;

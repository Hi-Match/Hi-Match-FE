// 기업회원
interface CompanyForm {
    companyName: string;
    licenseNumber: string;
    companyPart: string;
    companyMembers: string;
}

interface BizForm {
    id: string;
    password: string;
    name: string;
    email: string;
    phone: string;
}

interface CompanyValidState {
    isCompanyName: boolean;
    isLicenseNumber: boolean;
    isCompanyPart: boolean;
    isCompanyMembers: boolean;
}

interface BizValidState {
    isId: boolean;
    isPassword: boolean;
    isPasswordConfirm: boolean;
    isName: boolean;
    isEmail: boolean;
    isPhone: boolean;
}

interface BizAgreementState {
    all: boolean;
    use: boolean;
    business: boolean;
}

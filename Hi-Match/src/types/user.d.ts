// 개인회원
interface SignUpForm {
    id: string;
    password: string;
    name: string;
    email: string;
    phone: string;
}

interface ValidState {
    isId: boolean;
    isPassword: boolean;
    isPasswordConfirm: boolean;
    isName: boolean;
    isEmail: boolean;
    isPhone: boolean;
}

interface UserAgreementState {
    all: boolean;
    age: boolean;
    use: boolean;
    personal: boolean;
}

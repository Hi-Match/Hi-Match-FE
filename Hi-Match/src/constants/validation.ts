// 아이디 - 영문 + 숫자만 허용 (4-20자)
export const ID_REGEX = /^[a-zA-Z0-9]{4,20}$/;

// 비밀번호 - 영문 + 숫자 + 특수문자 포함 (8-16자)
export const PASSWORD_REGEX =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?]).{8,16}$/;

// 이름 - 공백, 특수문자 X (2글자 이상)
export const NAME_REGEX = /^[a-zA-Z가-힣]{2,}$/;

// 이메일
export const EMAIL_REGEX =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

// 휴대폰 번호
export const PHONE_REGEX = /^010[0-9]{8}$/;

// 인증 번호 6자리
export const AUTHCODE_REGEX = /^[0-9]{6}$/;

// 사업자등록번호 10자리
export const LICENSENUMBER_REGEX = /^[0-9]{10}$/;

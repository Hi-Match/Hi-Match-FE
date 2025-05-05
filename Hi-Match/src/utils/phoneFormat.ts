// 휴대폰번호 01012345678 형식을 010-1234-5678 형식으로 변환
export const formatPhoneNumber = (phone: string) => {
    return phone.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3");
};

import CategoryInput from "@/components/Input/CategoryInput";
import { useState } from "react";

interface CompanyPartInputProps {
    formPart: (val: string) => void;
    setValid: (val: boolean) => void;
}

const CompanyPartInput = ({ formPart, setValid }: CompanyPartInputProps) => {
    const [part, setPart] = useState<string>("");

    const partOptions = [
        "기획, 전략",
        "마케팅, 홍보, 조사",
        "회계, 세무, 재무",
        "인사, 노무, HRD",
        "총무, 법무, 사무",
        "IT 개발, 데이터",
        "디자인",
        "영업, 판매, 무역",
        "고객상담, TM",
        "구매, 자재, 물류",
        "상품기획, MD",
        "운전, 운송, 배송",
        "서비스",
        "생산",
        "건설, 건축",
        "의료",
        "연구, R&D",
        "교육",
        "미디어, 문화, 스포츠",
        "금융, 보험",
        "공공, 복지",
    ];

    const handleChangePart = (option: string) => {
        formPart(option);
        setPart(option);
        if (option !== "") {
            setValid(true);
        }
    };

    return (
        <CategoryInput
            label="산업 선택"
            id="companyPart"
            value={part}
            options={partOptions}
            onChange={option => handleChangePart(option)}
        />
    );
};

export default CompanyPartInput;

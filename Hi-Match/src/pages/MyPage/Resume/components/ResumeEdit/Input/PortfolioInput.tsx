import Input from "@/components/Input/Input";
import { useState } from "react";

interface PortfolioInputProps {
    resumeData: ResumeDetailData;
    onChange: (val: string) => void;
}

const PortfolioInput = ({ resumeData, onChange }: PortfolioInputProps) => {
    const [portfolio, setPortfolio] = useState<string>(
        resumeData.resumePortFolio ?? ""
    );

    const handleChangePortfolio = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setPortfolio(value);
        onChange(value);
    };

    return (
        <Input
            label="링크"
            id="portfolio"
            type="text"
            value={portfolio}
            variant="large"
            placeholder="http://"
            onChange={handleChangePortfolio}
        />
    );
};

export default PortfolioInput;

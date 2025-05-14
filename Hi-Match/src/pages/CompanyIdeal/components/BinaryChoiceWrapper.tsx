import { useState } from "react";
import BinaryChoiceButtons from "./BinaryChoiceButtons";

const BinaryChoiceWrapper = () => {
    const [selectedButtons, setSelectedButtons] = useState<{
        [key: number]: "left" | "right" | null;
    }>({
        0: null,
        1: null,
        2: null,
        3: null,
    });

    const handleButtonClick = (index: number, side: "left" | "right") => {
        setSelectedButtons(prev => ({
            ...prev,
            [index]: side,
        }));
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <BinaryChoiceButtons
                leftLabel="소통하는"
                rightLabel="집중하는"
                leftDescription="Network (사람 중심, 팀워크, 교류 선호)"
                rightDescription="Focus (몰입 중심, 독립 작업, 혼자 해결)"
                onClickLeft={() => handleButtonClick(0, "left")}
                onClickRight={() => handleButtonClick(0, "right")}
                selectedButton={selectedButtons[0]}
            />
            <BinaryChoiceButtons
                leftLabel="주도적인"
                rightLabel="안정적인"
                leftDescription="Drive (리더형, 방향 제시, 주도성)"
                rightDescription="Balance (서포터형, 안정감, 신중함)"
                onClickLeft={() => handleButtonClick(1, "left")}
                onClickRight={() => handleButtonClick(1, "right")}
                selectedButton={selectedButtons[1]}
            />
            <BinaryChoiceButtons
                leftLabel="창의적인"
                rightLabel="분석적인"
                leftDescription="Creative (아이디어, 직관, 자유로운 사고)"
                rightDescription="Logical (논리, 데이터 기반, 분석력)"
                onClickLeft={() => handleButtonClick(2, "left")}
                onClickRight={() => handleButtonClick(2, "right")}
                selectedButton={selectedButtons[2]}
            />
            <BinaryChoiceButtons
                leftLabel="수직적인"
                rightLabel="수평적인"
                leftDescription="Structure (위계, 규범, 책임 분명)"
                rightDescription="Open (자율, 유연, 실력 중심)"
                onClickLeft={() => handleButtonClick(3, "left")}
                onClickRight={() => handleButtonClick(3, "right")}
                selectedButton={selectedButtons[3]}
            />
        </div>
    );
};

export default BinaryChoiceWrapper;

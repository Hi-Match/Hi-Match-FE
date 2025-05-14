interface BinaryChoiceButtonsProps {
    leftLabel: string;
    rightLabel: string;
    leftDescription: string;
    rightDescription: string;
    onClickLeft: () => void;
    onClickRight: () => void;
    selectedButton?: "left" | "right" | null;
}

interface ChoiceButtonProps {
    label: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}

const ChoiceButton = ({
    label,
    description,
    isSelected,
    onClick,
}: ChoiceButtonProps) => (
    <button
        className={`box-border w-80 rounded-lg border px-4 py-2 transition-colors cursor-pointer ${
            isSelected
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-200 hover:bg-gray-50 text-black/70 hover:text-black/90"
        }`}
        onClick={onClick}
    >
        <p className="text-lg font-medium">{label}</p>
        <span>{description}</span>
    </button>
);

const BinaryChoiceButtons = ({
    leftLabel,
    rightLabel,
    leftDescription,
    rightDescription,
    onClickLeft,
    onClickRight,
    selectedButton,
}: BinaryChoiceButtonsProps) => {
    return (
        <div className="flex w-full items-center justify-center gap-4">
            <ChoiceButton
                label={leftLabel}
                description={leftDescription}
                isSelected={selectedButton === "left"}
                onClick={onClickLeft}
            />
            <span className="text-gray-500">OR</span>
            <ChoiceButton
                label={rightLabel}
                description={rightDescription}
                isSelected={selectedButton === "right"}
                onClick={onClickRight}
            />
        </div>
    );
};

export default BinaryChoiceButtons;

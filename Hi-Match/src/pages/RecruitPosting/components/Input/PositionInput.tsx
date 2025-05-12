import Input from "@/components/Input/Input";

interface PositionInputProps {
    position: string;
    setPostion: (val: string) => void;
}

const PositionInput = ({ position, setPostion }: PositionInputProps) => {
    const handleChangePosition = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setPostion(value);
    };

    return (
        <div className="position_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                포지션명
                <span className="text-red-500"> &#42;</span>
            </p>
            <Input
                id="position"
                type="text"
                value={position}
                variant="large"
                placeholder="채용 공고의 제목이 될 포지션명을 작성해 주세요."
                onChange={handleChangePosition}
            />
        </div>
    );
};

export default PositionInput;

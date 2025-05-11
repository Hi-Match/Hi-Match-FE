import Input from "@/components/Input/Input";

interface NameInputProps {
    value: string;
    setName: (val: string) => void;
}

const NameInput = ({ value, setName }: NameInputProps) => {
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);
    };

    return (
        <div className="name_input">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                기업명
                <span className="text-red-500"> &#42;</span>
            </p>
            <Input
                id="company-name"
                type="text"
                value={value}
                placeholder="기업명"
                onChange={handleChangeName}
            />
        </div>
    );
};

export default NameInput;

import Input from "@/components/Input/Input";

interface ManageNameInputProps {
    value: string;
    setCEOName: (val: string) => void;
}

const ManageNameInput = ({ value, setCEOName }: ManageNameInputProps) => {
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setCEOName(value);
    };

    return (
        <div className="manage_name_input">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                담당자명
                <span className="text-red-500"> &#42;</span>
            </p>
            <Input
                id="company-manage"
                type="text"
                value={value}
                placeholder="담당자명"
                onChange={handleChangeName}
            />
        </div>
    );
};

export default ManageNameInput;

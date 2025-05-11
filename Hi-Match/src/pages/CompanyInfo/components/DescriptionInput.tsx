interface DescriptionInputProps {
    value: string;
    setDescription: (val: string) => void;
}

const DescriptionInput = ({ value, setDescription }: DescriptionInputProps) => {
    const handleChangeDescription = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        setDescription(value);
    };

    return (
        <div className="description_input">
            <p className="text-gray01 mb-2.5 text-sm font-medium">
                기업 소개
                <span className="text-red-500"> &#42;</span>
            </p>
            <textarea
                className="scroll-custom h-50 w-full resize-none rounded-[5px] border-1 border-solid border-gray-300 p-[15px] text-base font-medium text-black outline-blue-400 focus:outline-offset-0"
                id="ambition"
                value={value}
                placeholder="기업에 대해 소개해 주세요."
                maxLength={1000}
                onChange={handleChangeDescription}
            ></textarea>
        </div>
    );
};

export default DescriptionInput;

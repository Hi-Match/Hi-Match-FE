import { useState } from "react";

interface AmbitionInputProps {
    resumeData: ResumeDetailData;
    onChange: (val: string) => void;
}

const AmbitionInput = ({ resumeData, onChange }: AmbitionInputProps) => {
    const [ambition, setAmbition] = useState<string>(
        resumeData.resumeAmbition ?? ""
    );

    const handleChangeAmbition = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        setAmbition(value);
        onChange(value);
    };

    return (
        <div className="ambition_wrapper flex w-full flex-col">
            <label
                htmlFor="ambition"
                className="mb-2.5 w-full font-semibold text-black"
            >
                한 줄 소개
            </label>
            <textarea
                className="h-50 w-full resize-none rounded-[5px] border-1 border-solid border-gray-300 p-[15px] text-base font-medium text-black outline-blue-400 focus:outline-offset-0"
                id="ambition"
                value={ambition}
                placeholder="한 줄 자기소개를 작성해 주세요. (100자 이내)"
                maxLength={100}
                onChange={handleChangeAmbition}
            ></textarea>
            <div className="ambition_length mt-2.5 flex w-full justify-end">
                <span className="text-gray01 text-base">
                    {ambition.length}/100
                </span>
            </div>
        </div>
    );
};

export default AmbitionInput;

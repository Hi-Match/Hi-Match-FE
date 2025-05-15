import PostInput from "@/components/Input/PostInput";

interface AddressInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const AddressInput = ({ resumeData, setResumeData }: AddressInputProps) => {
    const handleChange = <K extends keyof ResumeDetailData>(
        key: K,
        value: ResumeDetailData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="address_wrapper flex w-full flex-col">
            <label
                htmlFor="address"
                className="mb-2.5 w-full font-semibold text-black"
            >
                주소
                <span className="text-red-500"> &#42;</span>
            </label>
            <PostInput
                value={resumeData.resumeAddress}
                onChange={fullAddress =>
                    handleChange("resumeAddress", fullAddress)
                }
            />
        </div>
    );
};

export default AddressInput;

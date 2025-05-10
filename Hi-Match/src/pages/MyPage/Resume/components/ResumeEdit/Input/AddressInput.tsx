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
        <div className="address_wrapper space-y-2.5">
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

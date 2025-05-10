import PostInput from "@/components/Input/PostInput";

interface AddressInputProps {
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const AddressInput = ({ setResumeData }: AddressInputProps) => {
    const handleChange = <K extends keyof ResumeDetailData>(
        key: K,
        value: ResumeDetailData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="address_wrapper space-y-2.5">
            <PostInput
                onChange={fullAddress =>
                    handleChange("resumeAddress", fullAddress)
                }
            />
        </div>
    );
};

export default AddressInput;

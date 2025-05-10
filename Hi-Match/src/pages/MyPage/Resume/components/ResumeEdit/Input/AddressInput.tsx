import Input from "@/components/Input/Input";
import PostInput from "@/components/Input/PostInput";
import { useEffect, useState } from "react";

interface AddressInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const AddressInput = ({ resumeData, setResumeData }: AddressInputProps) => {
    const [mainAddress, setMainAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState<string>("");

    const handleChange = <K extends keyof ResumeDetailData>(
        key: K,
        value: ResumeDetailData[K]
    ) => {
        setResumeData(prev => ({ ...prev, [key]: value }));
    };

    const handlePostChange = (mainAddress: string) => {
        setMainAddress(mainAddress);
        handleChange("resumeAddress", `${mainAddress}`);
    };

    const handleChangeDetailAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setDetailAddress(value);
    };

    useEffect(() => {
        if (mainAddress) {
            handleChange("resumeAddress", `${mainAddress} ${detailAddress}`);
        }
    }, [mainAddress, detailAddress]);

    return (
        <div className="address_wrapper space-y-2.5">
            <PostInput
                value={resumeData.resumeAddress}
                onChange={fullAddress => handlePostChange(fullAddress)}
            />
            <Input
                id="detailAddress"
                type="text"
                value={detailAddress}
                variant="large"
                placeholder="상세주소"
                onChange={handleChangeDetailAddress}
            />
        </div>
    );
};

export default AddressInput;

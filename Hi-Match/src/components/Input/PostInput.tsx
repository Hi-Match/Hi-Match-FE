import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface PostInputProps {
    value?: string;
    onChange: (val: string) => void;
}

interface DaumPostcodeData {
    roadAddress: string;
    jibunAddress: string;
    zonecode: string;
    addressType: string;
    bname: string;
    buildingName: string;
    apartment: string;
    [key: string]: any; // 필요 시 추가 필드
}

const PostInput = ({ value, onChange }: PostInputProps) => {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        setAddress(value ?? "");
    }, [value]);

    const open = useDaumPostcodePopup(
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    );

    const handleComplete = (data: DaumPostcodeData) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }

            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }

            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
            onChange(fullAddress);
        }

        setAddress(fullAddress);
    };

    const searchAddress = () => {
        open({ onComplete: handleComplete });
    };

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setAddress(value);
    };

    const buttonHandler = {
        buttonEnabled: true,
        buttonText: "주소 찾기",
        onClick: searchAddress,
    };

    return (
        <Input
            id="address"
            type="text"
            value={address}
            variant="large"
            placeholder="주소"
            onChange={handleChangeAddress}
            buttonHandler={buttonHandler}
            isValid={true}
            disabled
        />
    );
};

export default PostInput;

import Input from "@/components/Input/Input";
import { useDaumPostcodePopup } from "react-daum-postcode";
import SearchIcon from "@/assets/icons/search-icon.svg?react";

interface AddressInputProps {
    address: string;
    setAddress: (val: string) => void;
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

const AddressInput = ({ address, setAddress }: AddressInputProps) => {
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

    return (
        <div className="address_input">
            <p className="text-gray01 mb-2.5 text-base font-medium">
                근무지
                <span className="text-red-500"> &#42;</span>
            </p>
            <div className="relative">
                <Input
                    id="address"
                    type="text"
                    value={address}
                    variant="large"
                    placeholder="기업 주소"
                    onChange={handleChangeAddress}
                />
                <button
                    type="button"
                    className="absolute top-[13px] right-[15px] cursor-pointer"
                    onClick={searchAddress}
                >
                    <SearchIcon className="h-6 w-6 fill-gray-400" />
                </button>
            </div>
        </div>
    );
};

export default AddressInput;

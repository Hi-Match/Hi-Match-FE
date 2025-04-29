import axiosInstance from "@/apis/axiosInstance";
import Input from "@/components/Input/Input";
import { LICENSENUMBER_REGEX, NAME_REGEX } from "@/constants";
import { useFindIdStore } from "@/store/findIdStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BizFindIdForm = () => {
    const [name, setName] = useState<string>("");
    const [licenseNumber, setLicenseNumber] = useState<string>("");

    const [isName, setIsName] = useState<boolean>(false);
    const [isLicenseNumber, setIsLicenseNumber] = useState<boolean>(false);

    const [nameValidation, setNameValidation] = useState({
        success: false,
        message: "",
    });
    const [licenseValidation, setLicenseValidation] = useState({
        success: false,
        message: "",
    });

    const navigate = useNavigate();
    const setFindIdInfo = useFindIdStore(state => state.setFindId);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);

        const isValid = NAME_REGEX.test(value);

        if (isValid) {
            setNameValidation({
                success: true,
                message: "",
            });
            setIsName(true);
        } else {
            setNameValidation({
                success: false,
                message:
                    "한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)",
            });
        }
    };

    const handleChangeLicense = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setLicenseNumber(value);

        const isValid = LICENSENUMBER_REGEX.test(value);

        if (isValid) {
            setLicenseValidation({
                success: true,
                message: "",
            });
            setIsLicenseNumber(true);
        } else {
            setLicenseValidation({
                success: false,
                message: "사업자 등록번호를 입력해 주세요",
            });
        }
    };

    const handleSubmitFindId = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const memberInfo = {
            memberName: name,
            licenseNumber: licenseNumber,
        };

        axiosInstance
            .post("/himatch/company/member/idfind", memberInfo)
            .then(response => {
                setFindIdInfo(response.data);
                navigate("/findid/business/list");
            })
            .catch(() => {
                navigate("/findid/business/notfound");
            });
    };

    return (
        <div className="find_id_wrapper grid-center">
            <form
                className="find_id_form space-y-12.5"
                onSubmit={handleSubmitFindId}
            >
                <div className="space-y-7.5">
                    <Input
                        label="담당자명"
                        id="name"
                        type="text"
                        value={name}
                        placeholder="담당자명"
                        onChange={handleChangeName}
                        isValid={nameValidation.success}
                        validMessage={nameValidation.message}
                    />
                    <Input
                        label="사업자등록번호"
                        id="companyNumber"
                        type="text"
                        value={licenseNumber}
                        placeholder="'-'제외 10자리"
                        maxLength={10}
                        onChange={handleChangeLicense}
                        isValid={licenseValidation.success}
                        validMessage={licenseValidation.message}
                    />
                </div>
                <button
                    type="submit"
                    className={`btn-lg ${isName && isLicenseNumber ? "btn-blue" : "btn-disabled"}`}
                    disabled={isName && isLicenseNumber ? false : true}
                >
                    아이디 찾기
                </button>
            </form>
        </div>
    );
};

export default BizFindIdForm;

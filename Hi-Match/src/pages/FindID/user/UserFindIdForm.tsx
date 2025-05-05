import axiosInstance from "@/apis/axiosInstance";
import AuthNumberInput from "@/components/Input/AuthNumberInput";
import Input from "@/components/Input/Input";
import { NAME_REGEX } from "@/constants";
import { useFindIdStore } from "@/store/findIdStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserFindIdForm = () => {
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [isName, setIsName] = useState<boolean>(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);

    const [nameValidation, setNameValidation] = useState({
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

    const handleSubmitFindId = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const memberInfo = {
            memberName: name,
            memberPhone: phoneNumber,
        };

        axiosInstance
            .post("/himatch/member/idfind", memberInfo)
            .then(response => {
                setFindIdInfo(response.data);
                navigate("/findid/user/list");
            })
            .catch(() => {
                navigate("/findid/user/notfound");
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
                        label="이름"
                        id="name"
                        type="text"
                        value={name}
                        placeholder="이름"
                        onChange={handleChangeName}
                        isValid={nameValidation.success}
                        validMessage={nameValidation.message}
                    />
                    <AuthNumberInput
                        formPhoneNumber={(newPhone: string) =>
                            setPhoneNumber(newPhone)
                        }
                        setValid={(valid: boolean) => setIsPhoneNumber(valid)}
                    />
                </div>
                <button
                    type="submit"
                    className={`btn-lg ${isPhoneNumber && isName ? "btn-blue" : "btn-disabled"}`}
                    disabled={isPhoneNumber && isName ? false : true}
                >
                    아이디 찾기
                </button>
            </form>
        </div>
    );
};

export default UserFindIdForm;

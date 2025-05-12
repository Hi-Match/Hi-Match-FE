import DatePicker from "@/components/Input/DatePicker";
import GenderInput from "./GenderInput";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";
import { useCallback, useEffect, useState } from "react";

interface ProfileInfoInputProps {
    resumeData: ResumeDetailData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeDetailData>>;
}

const ProfileInfoInput = ({
    resumeData,
    setResumeData,
}: ProfileInfoInputProps) => {
    const [gender, setGender] = useState<string>("");

    const handleChange = useCallback(
        (key: keyof ResumeDetailData, value: string) => {
            setResumeData(prev => ({ ...prev, [key]: value }));
        },
        [setResumeData]
    );

    const handleChangeGender = (option: string) => {
        setGender(option);
    };

    useEffect(() => {
        if (gender === "남자") {
            handleChange("resumeGender", "M");
        } else if (gender === "여자") {
            handleChange("resumeGender", "F");
        }
    }, [gender]);

    return (
        <>
            <div className="user_name space-y-2.5">
                <input
                    id="name"
                    type="text"
                    value={resumeData.resumeName ?? ""}
                    placeholder="이름"
                    className="w-full text-[28px] font-semibold text-black focus:outline-none"
                    onChange={event =>
                        handleChange("resumeName", event.target.value)
                    }
                />
                <input
                    id="engName"
                    type="text"
                    value={resumeData.resumeEngName}
                    placeholder="영어 이름 (ex. Gildong Hong)"
                    className="w-full text-base font-medium text-black focus:outline-none"
                    onChange={event => {
                        const value = event.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                        );

                        handleChange("resumeEngName", value);
                    }}
                />
            </div>
            <div className="user_info space-y-2.5">
                <div className="date_wrapper flex items-center [&>div]:flex-grow">
                    <span className="w-25 text-base font-semibold text-black">
                        생년월일<span className="text-red-500"> &#42;</span>
                    </span>
                    <div className="input_wrapper">
                        <DatePicker
                            select="생년월일"
                            onChange={date =>
                                handleChange("resumeBirthDay", date)
                            }
                        />
                    </div>
                </div>
                <div className="gender_wrapper flex items-center [&>div]:flex-grow">
                    <span className="w-25 text-base font-semibold text-black">
                        성별<span className="text-red-500"> &#42;</span>
                    </span>
                    <div className="input_wrapper">
                        <GenderInput
                            gender={gender ?? ""}
                            onChange={gender => {
                                handleChangeGender(gender);
                            }}
                        />
                    </div>
                </div>
                <div className="email_wrapper flex items-center [&>div]:flex-grow">
                    <span className="w-25 text-base font-semibold text-black">
                        이메일<span className="text-red-500"> &#42;</span>
                    </span>
                    <div className="input_wrapper">
                        <EmailInput
                            email={resumeData.resumeMail}
                            onChange={email =>
                                handleChange("resumeMail", email)
                            }
                        />
                    </div>
                </div>
                <div className="phone_wrapper flex items-center [&>div]:flex-grow">
                    <span className="w-25 text-base font-semibold text-black">
                        휴대폰 번호<span className="text-red-500"> &#42;</span>
                    </span>
                    <div className="input_wrapper">
                        <PhoneInput
                            phone={resumeData.resumeTel}
                            onChange={phone => handleChange("resumeTel", phone)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfoInput;

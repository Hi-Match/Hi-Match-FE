import CategoryInput from "@/components/Input/CategoryInput";
import CheckInput from "@/components/Input/CheckInput";
import DatePicker from "@/components/Input/DatePicker";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";
import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import { GPA_REGEX } from "@/constants";

interface SchoolFormProps {
    data: ResumeSchool;
    index: number;
    onChange: (data: ResumeSchool) => void;
    onRemove?: () => void;
}

const SchoolForm = ({ data, index, onChange, onRemove }: SchoolFormProps) => {
    const [isTransfer, setIsTransfer] = useState<boolean>(false);
    const [isGraduated, setIsGraduated] = useState<boolean>(false);
    const [addMinor, setAddMinor] = useState<boolean>(false);
    const [addMultiple, setAddMultiple] = useState<boolean>(false);

    const schoolPartOptions = [
        "검정고시",
        "고등학교",
        "전문학사",
        "학사",
        "석사",
        "박사",
    ];

    useEffect(() => {
        handleChange("schoolLev", getSchoolLevel(data.schoolPart));
    }, [data.schoolPart]);

    const getSchoolLevel = (schoolPart: string) => {
        switch (schoolPart) {
            case "검정고시":
                return 1;
            case "고등학교":
                return 1;
            case "전문학사":
                return 2;
            case "학사":
                return 3;
            case "석사":
                return 4;
            case "박사":
                return 5;
            default:
                return 0;
        }
    };

    const schoolGPAOptions = ["3.5", "4.0", "4.5", "5.0", "7.0", "100"];

    const handleChange = <K extends keyof ResumeSchool>(
        key: K,
        value: ResumeSchool[K]
    ) => {
        onChange({ ...data, [key]: value });
    };

    const handleCheckDegree = () => {
        setIsTransfer(!isTransfer);
    };

    useEffect(() => {
        if (data.schoolPart !== "" && isTransfer) {
            handleChange("schoolDegree", "편입");
        } else if (data.schoolPart !== "" && !isTransfer) {
            handleChange("schoolDegree", "입학");
        }
    }, [isTransfer]);

    const handleCheckGraduate = () => {
        setIsGraduated(!isGraduated);
    };

    const handleClickAddMultiple = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setAddMultiple(true);
    };

    const handleClickAddMinor = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setAddMinor(true);
    };

    return (
        <div className="school_form space-y-2.5">
            <div className="grid grid-cols-2 items-center gap-x-7.5 gap-y-2.5">
                <CategoryInput
                    id="schoolPart"
                    value={data.schoolPart ?? ""}
                    select="학력 선택"
                    variant="extraLarge"
                    options={schoolPartOptions}
                    onChange={part => handleChange("schoolPart", part)}
                />
                {data.schoolPart === "검정고시" && (
                    <DatePicker
                        select="합격일자"
                        onChange={date =>
                            handleChange("schoolAdmissionDate", date)
                        }
                    />
                )}
                {1 < data.schoolLev && (
                    <CheckInput
                        label="편입"
                        id={`transfer-${index}`}
                        isChecked={isTransfer}
                        onChange={handleCheckDegree}
                    />
                )}
                {data.schoolPart !== "검정고시" && 1 <= data.schoolLev && (
                    <Input
                        id="schoolName"
                        value={data.schoolName ?? ""}
                        variant="large"
                        placeholder="학교 이름"
                        maxLength={30}
                        onChange={event =>
                            handleChange("schoolName", event.target.value)
                        }
                    />
                )}
                {1 < data.schoolLev && (
                    <Input
                        id="schoolMajor"
                        value={data.schoolMajor}
                        variant="large"
                        placeholder="전공"
                        maxLength={30}
                        onChange={event =>
                            handleChange("schoolMajor", event.target.value)
                        }
                    />
                )}
                {1 < data.schoolLev && (
                    <div className="schoolGPA grid grid-cols-2 gap-x-2.5">
                        <Input
                            type="text"
                            id="schoolGPA"
                            value={data.schoolGPA?.toString() ?? ""}
                            variant="large"
                            placeholder="학점"
                            maxLength={4}
                            onChange={event => {
                                const value = event.target.value;

                                if (value === "" || GPA_REGEX.test(value)) {
                                    handleChange("schoolGPA", value);
                                }
                            }}
                        />
                        <CategoryInput
                            id="schoolStandardGPA"
                            select="기준 학점"
                            value={data.schoolStandardGPA?.toString() ?? ""}
                            variant="extraLarge"
                            options={schoolGPAOptions}
                            onChange={GPA =>
                                handleChange("schoolStandardGPA", GPA)
                            }
                        />
                    </div>
                )}
            </div>
            {data.schoolPart !== "검정고시" && 1 <= data.schoolLev && (
                <div className="school_date grid grid-cols-2 gap-x-7.5 gap-y-2.5">
                    <DatePicker
                        select="입학일"
                        onChange={date =>
                            handleChange("schoolAdmissionDate", date)
                        }
                    />
                    <DatePicker
                        select="졸업일"
                        disabled={isGraduated}
                        onChange={date => {
                            if (isGraduated) {
                                handleChange("schoolGraduationDate", "");
                            } else {
                                handleChange("schoolGraduationDate", date);
                            }
                        }}
                    />
                    {1 < data.schoolLev && (
                        <div className="col-span-1 col-end-3">
                            <CheckInput
                                label="재학중"
                                id={`student-${index}`}
                                isChecked={isGraduated}
                                onChange={handleCheckGraduate}
                            />
                        </div>
                    )}
                </div>
            )}
            {1 < data.schoolLev && (
                <div className="grid grid-cols-2 items-center gap-x-7.5">
                    {addMultiple ? (
                        <Input
                            id="schoolMultiple"
                            value={data.schoolMultiple}
                            variant="large"
                            placeholder="복수전공"
                            maxLength={30}
                            onChange={event =>
                                handleChange(
                                    "schoolMultiple",
                                    event.target.value
                                )
                            }
                        />
                    ) : (
                        <button
                            type="button"
                            className="btn-gray text-gray02 btn-xl flex-center space-x-2.5"
                            onClick={event => handleClickAddMultiple(event)}
                        >
                            <PlusIcon className="fill-gray02 h-3 w-3" />
                            <span>복수전공</span>
                        </button>
                    )}
                    {addMinor ? (
                        <Input
                            id="schoolMinor"
                            value={data.schoolMinor}
                            variant="large"
                            placeholder="부전공"
                            maxLength={30}
                            onChange={event =>
                                handleChange("schoolMinor", event.target.value)
                            }
                        />
                    ) : (
                        <button
                            type="button"
                            className="btn-gray text-gray02 btn-xl flex-center space-x-2.5"
                            onClick={event => handleClickAddMinor(event)}
                        >
                            <PlusIcon className="fill-gray02 h-3 w-3" />
                            <span>부전공</span>
                        </button>
                    )}
                </div>
            )}
            {onRemove && (
                <div className="delete_btn_wrapper flex justify-end">
                    <button
                        type="button"
                        className="flex-center btn-red cursor-pointer p-2.5 text-red-500"
                        onClick={onRemove}
                    >
                        <DeleteIcon className="h-4 w-4 fill-red-400" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SchoolForm;

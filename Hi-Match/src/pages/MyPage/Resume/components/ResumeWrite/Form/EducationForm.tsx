import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import CheckInput from "@/components/Input/CheckInput";
import DatePicker from "@/components/Input/DatePicker";
import Input from "@/components/Input/Input";
import { useState } from "react";

interface ExperienceFormProps {
    data: ResumeEducation;
    index: number;
    onChange: (data: ResumeEducation) => void;
    onRemove?: () => void;
}

const EducationForm = ({
    data,
    index,
    onChange,
    onRemove,
}: ExperienceFormProps) => {
    const [isTraining, setIsTraining] = useState<boolean>(false);

    const handleChange = <K extends keyof ResumeEducation>(
        key: K,
        value: ResumeEducation[K]
    ) => {
        onChange({ ...data, [key]: value });
    };

    const handleCheckTraining = () => {
        setIsTraining(!isTraining);
    };

    return (
        <div className="education_form space-y-2.5">
            <Input
                id="eduTitle"
                value={data.eduTitle ?? ""}
                variant="large"
                placeholder="교육명"
                onChange={event => handleChange("eduTitle", event.target.value)}
            />
            <div className="grid grid-cols-2 items-center gap-x-7.5 gap-y-2.5">
                <Input
                    id="eduOrganization"
                    value={data.eduOrgan}
                    variant="large"
                    placeholder="교육기관"
                    onChange={event =>
                        handleChange("eduOrgan", event.target.value)
                    }
                />
                <div className="relative">
                    <Input
                        id="eduTime"
                        value={data.eduTime}
                        variant="large"
                        placeholder="이수시간(숫자만 입력)"
                        maxLength={5}
                        onChange={event =>
                            handleChange(
                                "eduTime",
                                event.target.value.replace(/[^0-9]/g, "")
                            )
                        }
                    />
                    <span className="text-gray01 absolute top-[13px] right-[15px] text-base font-semibold">
                        시간
                    </span>
                </div>
            </div>
            <div className="school_date grid grid-cols-2 gap-x-7.5 gap-y-2.5">
                <DatePicker
                    select="시작일"
                    onChange={date => handleChange("eduStartDate", date)}
                />
                <DatePicker
                    select="종료일"
                    disabled={isTraining}
                    onChange={date => {
                        if (isTraining) {
                            handleChange("eduEndDate", "");
                        } else {
                            handleChange("eduEndDate", date);
                        }
                    }}
                />
                <div className="col-span-1 col-end-3">
                    <CheckInput
                        label="교육중"
                        id={`student-${index}`}
                        isChecked={isTraining}
                        onChange={handleCheckTraining}
                    />
                </div>
            </div>
            <div className="achievement_wrapper flex w-full flex-col">
                <label
                    htmlFor="achievement"
                    className="mb-2.5 w-full font-semibold text-black"
                >
                    교육 내용
                </label>
                <textarea
                    className="h-50 w-full resize-none rounded-[5px] border-1 border-solid border-gray-300 p-[15px] text-base font-medium text-black outline-blue-400 focus:outline-offset-0"
                    id="eduContent"
                    value={data.eduContent ?? ""}
                    placeholder="교육 내용에 대해 작성해 주세요."
                    onChange={event =>
                        handleChange("eduContent", event.target.value)
                    }
                ></textarea>
            </div>
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

export default EducationForm;

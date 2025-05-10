import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import DatePicker from "@/components/Input/DatePicker";
import CheckInput from "@/components/Input/CheckInput";

interface ExperienceFormProps {
    data: ResumeExperience;
    index: number;
    onChange: (data: ResumeExperience) => void;
    onRemove?: () => void;
}

const ExperienceForm = ({
    data,
    index,
    onChange,
    onRemove,
}: ExperienceFormProps) => {
    const [isCurrent, setIsCurrent] = useState<boolean>(false);

    const handleChange = <K extends keyof ResumeExperience>(
        key: K,
        value: ResumeExperience[K]
    ) => {
        onChange({ ...data, [key]: value });
    };

    const handleCheckWork = () => {
        setIsCurrent(!isCurrent);
    };

    useEffect(() => {
        handleChange("expIsCurrent", isCurrent);
    }, [isCurrent]);

    return (
        <div className="experience_form space-y-2.5">
            <Input
                id="companyName"
                value={data.expCompanyName ?? ""}
                variant="large"
                placeholder="회사명"
                onChange={event =>
                    handleChange("expCompanyName", event.target.value)
                }
            />
            <div className="grid grid-cols-2 items-center gap-x-7.5">
                <Input
                    id="position"
                    value={data.expPosition ?? ""}
                    variant="large"
                    placeholder="직책"
                    onChange={event =>
                        handleChange("expPosition", event.target.value)
                    }
                />
                <Input
                    id="part"
                    value={data.expPart ?? ""}
                    variant="large"
                    placeholder="부서"
                    onChange={event =>
                        handleChange("expPart", event.target.value)
                    }
                />
            </div>
            <div className="experience_date grid grid-cols-2 items-center gap-x-7.5 gap-y-2.5">
                <DatePicker
                    select="입사일"
                    onChange={date => handleChange("expStartDate", date)}
                />
                <DatePicker
                    select="퇴사일"
                    disabled={isCurrent}
                    onChange={date => {
                        if (!isCurrent) {
                            handleChange("expEndDate", date);
                        } else {
                            handleChange("expEndDate", "");
                        }
                    }}
                />
                <div className="col-span-1 col-end-3">
                    <CheckInput
                        label="재직중"
                        id={`work-${index}`}
                        isChecked={isCurrent}
                        onChange={handleCheckWork}
                    />
                </div>
            </div>
            <div className="achievement_wrapper flex w-full flex-col">
                <label
                    htmlFor="achievement"
                    className="mb-2.5 w-full font-semibold text-black"
                >
                    담당 업무
                </label>
                <textarea
                    className="h-50 w-full resize-none rounded-[5px] border-1 border-solid border-gray-300 p-[15px] text-base font-medium text-black outline-blue-400 focus:outline-offset-0"
                    id="achievement"
                    value={data.expAchievement ?? ""}
                    placeholder="담당 업무 및 성과에 대해 작성해 주세요."
                    onChange={event =>
                        handleChange("expAchievement", event.target.value)
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

export default ExperienceForm;

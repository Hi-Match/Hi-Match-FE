import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import DatePicker from "@/components/Input/DatePicker";
import Input from "@/components/Input/Input";

interface AwardFormProps {
    data: ResumeAward;
    onChange: (data: ResumeAward) => void;
    onRemove?: () => void;
}

const AwardForm = ({ data, onChange, onRemove }: AwardFormProps) => {
    const handleChange = <K extends keyof ResumeAward>(
        key: K,
        value: ResumeAward[K]
    ) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="award_form space-y-2.5">
            <Input
                id="awardTitle"
                value={data.awaTitle ?? ""}
                variant="large"
                placeholder="수상 제목"
                onChange={event => handleChange("awaTitle", event.target.value)}
            />
            <div className="grid grid-cols-2 items-center gap-x-7.5 gap-y-2.5">
                <Input
                    id="competitionName"
                    value={data.awaCompetitionName}
                    variant="large"
                    placeholder="수상명"
                    onChange={event =>
                        handleChange("awaCompetitionName", event.target.value)
                    }
                />
                <Input
                    id="organization"
                    value={data.awaOrgan}
                    variant="large"
                    placeholder="수상기관"
                    onChange={event =>
                        handleChange("awaOrgan", event.target.value)
                    }
                />
                <DatePicker
                    select="수상일자"
                    onChange={date => handleChange("awaDate", date)}
                />
            </div>
            <div className="content_wrapper flex w-full flex-col">
                <label
                    htmlFor="content"
                    className="mb-2.5 w-full font-semibold text-black"
                >
                    수상 내용
                </label>
                <textarea
                    className="h-50 w-full resize-none rounded-[5px] border-1 border-solid border-gray-300 p-[15px] text-base font-medium text-black outline-blue-400 focus:outline-offset-0"
                    id="content"
                    value={data.awaContent}
                    placeholder="수상 내용에 대해 작성해 주세요."
                    onChange={event =>
                        handleChange("awaContent", event.target.value)
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

export default AwardForm;

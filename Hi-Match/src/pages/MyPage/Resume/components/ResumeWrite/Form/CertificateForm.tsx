import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import CheckInput from "@/components/Input/CheckInput";
import DatePicker from "@/components/Input/DatePicker";
import Input from "@/components/Input/Input";
import { useState } from "react";

interface CertificateFormProps {
    data: ResumeCertificate;
    index: number;
    onChange: (data: ResumeCertificate) => void;
    onRemove?: () => void;
}

const CertificateForm = ({
    data,
    index,
    onChange,
    onRemove,
}: CertificateFormProps) => {
    const [isExpired, setIsExpired] = useState<boolean>(false);

    const handleChange = <K extends keyof ResumeCertificate>(
        key: K,
        value: ResumeCertificate[K]
    ) => {
        onChange({ ...data, [key]: value });
    };

    const handleCheckExpired = () => {
        setIsExpired(!isExpired);
    };

    return (
        <div className="certificate_form space-y-2.5">
            <div className="grid grid-cols-2 items-center gap-x-7.5 gap-y-2.5">
                <Input
                    id="certificateName"
                    value={data.cerTitle}
                    variant="large"
                    placeholder="자격증명"
                    onChange={event =>
                        handleChange("cerTitle", event.target.value)
                    }
                />
                <Input
                    id="authority"
                    value={data.cerAuthority}
                    variant="large"
                    placeholder="발행기관"
                    onChange={event =>
                        handleChange("cerAuthority", event.target.value)
                    }
                />
            </div>
            <div className="school_date grid grid-cols-2 gap-x-7.5 gap-y-2.5">
                <DatePicker
                    select="취득일자"
                    onChange={date => handleChange("cerDate", date)}
                />
                <DatePicker
                    select="만료일자"
                    disabled={isExpired}
                    onChange={date => {
                        if (isExpired) {
                            handleChange("cerExpire", "");
                        } else {
                            handleChange("cerExpire", date);
                        }
                    }}
                />
                <div className="col-span-1 col-end-3">
                    <CheckInput
                        label="유효기간 없음"
                        id={`expire-${index}`}
                        isChecked={isExpired}
                        onChange={handleCheckExpired}
                    />
                </div>
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

export default CertificateForm;

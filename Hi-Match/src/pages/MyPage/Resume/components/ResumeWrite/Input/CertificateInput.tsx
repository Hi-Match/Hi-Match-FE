import CertificateForm from "../Form/CertificateForm";
import PlusIcon from "@/assets/icons/plus-icon.svg?react";

interface CertificateInputProps {
    resumeCertificate: ResumeCertificate[];
    setResumeCertificate: React.Dispatch<
        React.SetStateAction<ResumeCertificate[]>
    >;
}

const CertificateInput = ({
    resumeCertificate,
    setResumeCertificate,
}: CertificateInputProps) => {
    const handleAddForm = () => {
        const newExperienceData: ResumeCertificate = {
            cerTitle: "",
            cerAuthority: "",
            cerDate: "",
            cerExpire: "",
        };

        setResumeCertificate(prev => [...prev, newExperienceData]);
    };

    const handleRemoveForm = (index: number) => {
        setResumeCertificate(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeForm = (index: number, updated: ResumeCertificate) => {
        setResumeCertificate(prev =>
            prev.map((form, i) => (i === index ? updated : form))
        );
    };

    return (
        <div className="certificate_wrapper space-y-7.5">
            {resumeCertificate.map((data, index) => (
                <div
                    key={index}
                    className={`${index !== 0 && "border-gray03 w-full border-t-1 border-solid pt-7.5"}`}
                >
                    <CertificateForm
                        data={data}
                        index={index}
                        onChange={updated => handleChangeForm(index, updated)}
                        onRemove={() => handleRemoveForm(index)}
                    />
                </div>
            ))}
            <div className="add_btn_wrapper mt-10">
                <button
                    type="button"
                    className="btn-gray text-gray02 btn-xl flex-center space-x-2.5"
                    onClick={handleAddForm}
                >
                    <PlusIcon className="fill-gray02 h-3 w-3" />
                    <span>추가</span>
                </button>
            </div>
        </div>
    );
};

export default CertificateInput;

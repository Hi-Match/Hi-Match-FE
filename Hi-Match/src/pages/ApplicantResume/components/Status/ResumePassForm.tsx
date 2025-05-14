import { useApplicantFinalPass } from "@/hooks/applicant/useApplicantFinalPass";
import { useApplicantRejected } from "@/hooks/applicant/useApplicantRejected";

interface ResumePassFormProps {
    applicationNo: number;
}

const ResumePassForm = ({ applicationNo }: ResumePassFormProps) => {
    const { mutate: applicantRejected } = useApplicantRejected();
    const { mutate: applicantFinalPass } = useApplicantFinalPass();

    const handleClickRejected = () => {
        applicantRejected({ applicationNo: applicationNo });
    };

    const handleClickFinalPass = () => {
        applicantFinalPass({ applicationNo: applicationNo });
    };

    return (
        <div className="resume_pass_form space-y-12.5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    지원자 상태
                </h3>
                <span className="flex-center h-11 rounded-[22px] border-2 border-solid border-blue-400 px-5 text-lg font-semibold text-blue-500">
                    서류 합격
                </span>
            </div>
            <div className="flex justify-end space-x-7.5">
                <button
                    type="button"
                    className="btn-red btn-xl text-red-500"
                    onClick={handleClickRejected}
                >
                    불합격
                </button>
                <button
                    type="button"
                    className="btn-blue btn-xl"
                    onClick={handleClickFinalPass}
                >
                    최종 합격
                </button>
            </div>
        </div>
    );
};

export default ResumePassForm;

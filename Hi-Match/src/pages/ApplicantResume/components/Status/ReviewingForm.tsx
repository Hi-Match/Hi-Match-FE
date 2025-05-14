import { useApplicantRejected } from "@/hooks/applicant/useApplicantRejected";
import { useApplicantResumePass } from "@/hooks/applicant/useApplicantResumePass";

interface ReviewingFormProps {
    applicationNo: number;
}

const ReviewingForm = ({ applicationNo }: ReviewingFormProps) => {
    const { mutate: applicantRejected } = useApplicantRejected();
    const { mutate: applicantResumePass } = useApplicantResumePass();

    const handleClickRejected = () => {
        applicantRejected({ applicationNo: applicationNo });
    };

    const handleClickResumePass = () => {
        applicantResumePass({ applicationNo: applicationNo });
    };

    return (
        <div className="reviewing_form space-y-12.5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    지원자 상태
                </h3>
                <span className="flex-center h-11 rounded-[22px] bg-amber-300 px-5 text-lg font-medium text-black">
                    서류 검토
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
                    onClick={handleClickResumePass}
                >
                    서류 합격
                </button>
            </div>
        </div>
    );
};

export default ReviewingForm;

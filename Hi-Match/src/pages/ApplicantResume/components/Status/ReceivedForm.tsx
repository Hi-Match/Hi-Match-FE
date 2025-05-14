import Input from "@/components/Input/Input";
import { useApplicantRejected } from "@/hooks/applicant/useApplicantRejected";
import { useApplicantResumePass } from "@/hooks/applicant/useApplicantResumePass";
import { useApplicantReviewing } from "@/hooks/applicant/useApplicantReviewing";
import { useState } from "react";

interface ReceivedFormProps {
    applicationNo: number;
}

const ReceivedForm = ({ applicationNo }: ReceivedFormProps) => {
    const [score, setScore] = useState<string>("");

    const handleChangeScore = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, "");

        setScore(value);
    };

    const { mutate: updateGrade } = useApplicantReviewing();
    const { mutate: applicantRejected } = useApplicantRejected();
    const { mutate: applicantResumePass } = useApplicantResumePass();

    const handleClickSetScore = () => {
        updateGrade({
            applicationNo: applicationNo,
            applicationGrade: Number(score),
        });
    };

    const handleClickRejected = () => {
        applicantRejected({ applicationNo: applicationNo });
    };

    const handleClickResumePass = () => {
        applicantResumePass({ applicationNo: applicationNo });
    };

    return (
        <div className="received_form space-y-12.5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">
                    지원자 상태
                </h3>
                <span className="flex-center h-11 rounded-[22px] border-2 border-solid border-gray-400 px-5 text-lg font-semibold text-gray-500">
                    지원 접수
                </span>
            </div>
            <div className="flex w-full items-end space-x-2.5">
                <Input
                    label="점수"
                    id="score"
                    type="text"
                    value={score}
                    variant="large"
                    placeholder="점수(숫자만 입력)"
                    maxLength={3}
                    onChange={handleChangeScore}
                />
                <button
                    type="button"
                    className="btn-blue h-12.5 w-20"
                    onClick={handleClickSetScore}
                >
                    완료
                </button>
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

export default ReceivedForm;

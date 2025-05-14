import ApplicantCard from "./ApplicantCard";

type Application = {
    applicationNo: number;
    applicationDate: string;
    applicationName: string;
    applicationGrade: number;
    applicationPart: string;
};

interface ResumePassListProps {
    resumepass: Application[];
}

const ResumePassList = ({ resumepass }: ResumePassListProps) => {
    return (
        <div className="resume_pass border-gray03 max-h-150 min-h-70 space-y-5 rounded-[10px] border border-solid bg-white p-5">
            <h4 className="text-base font-medium text-black">서류 합격</h4>
            <div className="space-y-5">
                {resumepass &&
                    resumepass.map((application, index) => (
                        <div key={index} className="applicant_card">
                            <ApplicantCard
                                applicantNo={application.applicationNo}
                                applicantName={application.applicationName}
                                applicantDate={application.applicationDate}
                                applicantGrade={application.applicationGrade}
                                applicantPart={application.applicationPart}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ResumePassList;

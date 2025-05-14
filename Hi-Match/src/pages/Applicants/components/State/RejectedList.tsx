import ApplicantCard from "./ApplicantCard";

type Application = {
    applicationNo: number;
    applicationDate: string;
    applicationName: string;
    applicationGrade: number;
    applicationPart: string;
};

interface RejectedListProps {
    rejected: Application[];
}

const RejectedList = ({ rejected }: RejectedListProps) => {
    return (
        <div className="rejected border-gray03 max-h-150 min-h-70 space-y-5 rounded-[10px] border border-solid bg-white p-5">
            <h4 className="text-base font-medium text-black">불합격</h4>
            <div className="space-y-5">
                {rejected &&
                    rejected.map((application, index) => (
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

export default RejectedList;

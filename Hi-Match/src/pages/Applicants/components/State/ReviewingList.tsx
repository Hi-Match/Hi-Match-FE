import ApplicantCard from "./ApplicantCard";

type Application = {
    applicationNo: number;
    applicationDate: string;
    applicationName: string;
    applicationGrade: number;
    applicationPart: string;
};

interface ReviewingListProps {
    reviewing: Application[];
}

const ReviewingList = ({ reviewing }: ReviewingListProps) => {
    return (
        <div className="reviewing border-gray03 max-h-150 min-h-70 space-y-5 rounded-[10px] border border-solid bg-white p-5">
            <h4 className="text-base font-medium text-black">서류 검토</h4>
            <div className="space-y-5">
                {reviewing &&
                    reviewing.map((application, index) => (
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

export default ReviewingList;

import axiosInstance from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReceivedForm from "./Status/ReceivedForm";
import ReviewingForm from "./Status/ReviewingForm";
import ResumePassForm from "./Status/ResumePassForm";
import FinalPassForm from "./Status/FinalPassForm";
import RejectedForm from "./Status/RejectedForm";

interface ApplicantStatusData {
    applicationStatus: string;
    applicationPf: string;
    applicationResult: string;
}

const ApplicantStatus = () => {
    const { resumeNo } = useParams();

    const { data } = useQuery<ApplicantStatusData>({
        queryKey: ["applicant-resume", resumeNo],
        queryFn: async () => {
            const response = await axiosInstance.get<ApplicantStatusData>(
                `/himatch/application/company/apply-detail?applicationNo=${resumeNo}`
            );

            return response.data;
        },
    });

    if (!data) return null;

    const { applicationStatus, applicationPf, applicationResult } = data;

    console.log(applicationPf, applicationResult);

    return (
        <div className="applicant_status w-full space-y-7.5 rounded-[10px] border-1 border-solid border-gray-50 bg-white p-12.5 shadow-sm">
            {applicationStatus === "SUBMIT" && (
                <ReceivedForm applicationNo={Number(resumeNo)} />
            )}

            {applicationStatus === "PROGRESS" && (
                <ReviewingForm applicationNo={Number(resumeNo)} />
            )}
            {applicationStatus === "RESUME_PASS" && (
                <ResumePassForm applicationNo={Number(resumeNo)} />
            )}
            {applicationStatus === "FINAL_PASS" && <FinalPassForm />}
            {applicationStatus === "FAIL" && <RejectedForm />}
        </div>
    );
};

export default ApplicantStatus;

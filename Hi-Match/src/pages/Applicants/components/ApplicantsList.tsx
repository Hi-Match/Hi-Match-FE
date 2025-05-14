import axiosInstance from "@/apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ReceivedList from "./State/ReceivedList";
import ReviewingList from "./State/ReviewingList";
import ResumePassList from "./State/ResumePassList";
import FinalPassList from "./State/FinalPassList";
import RejectedList from "./State/RejectedList";

type Application = {
    applicationNo: number;
    applicationDate: string;
    applicationStatus: string;
    applicationName: string;
    applicationGrade: number;
    applicationPart: string;
};

type StatusGroups = {
    received: Application[];
    reviewing: Application[];
    resumepass: Application[];
    finalpass: Application[];
    rejected: Application[];
};

interface ApplicantsListProps {
    postNo: number | null;
}

const ApplicantsList = ({ postNo }: ApplicantsListProps) => {
    const { data } = useQuery({
        queryKey: ["applicants-status", postNo],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/himatch/application/company/list?postingNo=${postNo}`
            );

            return response.data;
        },
        enabled: postNo !== null,
    });

    const categorizeApplicants = (data: Application[]): StatusGroups => {
        return (data ?? []).reduce<StatusGroups>(
            (acc, cur) => {
                switch (cur.applicationStatus) {
                    case "SUBMIT":
                        acc.received.push(cur);
                        break;
                    case "PROGRESS":
                        acc.reviewing.push(cur);
                        break;
                    case "RESUME_PASS":
                        acc.resumepass.push(cur);
                        break;
                    case "FINAL_PASS":
                        acc.finalpass.push(cur);
                        break;
                    case "FAIL":
                        acc.rejected.push(cur);
                        break;
                    default:
                        break;
                }
                return acc;
            },
            {
                received: [],
                reviewing: [],
                resumepass: [],
                finalpass: [],
                rejected: [],
            }
        );
    };

    const result = categorizeApplicants(data);

    return (
        <div className="applicants_list_form space-y-7.5">
            <h3 className="text-xl font-semibold text-black">지원자 목록</h3>
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-1">
                    <ReceivedList received={result.received} />
                </div>
                <div className="col-span-1">
                    <ReviewingList reviewing={result.reviewing} />
                </div>
                <div className="col-span-1">
                    <ResumePassList resumepass={result.resumepass} />
                </div>
                <div className="col-span-1">
                    <FinalPassList finalpass={result.finalpass} />
                </div>
                <div className="col-span-1">
                    <RejectedList rejected={result.rejected} />
                </div>
            </div>
        </div>
    );
};

export default ApplicantsList;

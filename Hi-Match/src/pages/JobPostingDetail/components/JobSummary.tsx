import JobSummaryCell from "./JobSummaryCell";

interface JobSummaryProps {
    companyName: string;
    postingTitle: string;
    postingPart: string;
    postingExperience: string;
    postingEducation: string;
    postingType: string;
    postingWorkEndTime: string;
    postingLocation: string;
}

const JobSummary = ({
    companyName,
    postingTitle,
    postingPart,
    postingExperience,
    postingEducation,
    postingType,
    postingLocation,
    postingWorkEndTime,
}: JobSummaryProps) => {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col">
                <p className="text-gray-500">{companyName}</p>
                <h3 className="text-2xl font-semibold">{postingTitle}</h3>
            </div>
            <ul className="flex flex-wrap justify-between py-4 border-t border-gray-200 border-b">
                <JobSummaryCell title="직무" content={postingPart} />
                <JobSummaryCell title="경력" content={postingExperience} />
                <JobSummaryCell title="학력" content={postingEducation} />
                <JobSummaryCell title="근무형태" content={postingType} />
                <JobSummaryCell title="근무지역 " content={postingLocation} />
                <JobSummaryCell title="근무시간" content={postingWorkEndTime} />
            </ul>
        </section>
    );
};

export default JobSummary;

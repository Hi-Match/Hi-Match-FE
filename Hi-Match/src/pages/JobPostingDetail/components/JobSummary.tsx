import JobSummaryCell from "./JobSummaryCell";

interface JobSummaryProps {
    companyName: string;
    postingTitle: string;
    postingPart: string;
    postingExperience: string;
    postingEducation: string;
    postingType: string;
    postingWorkType: string;
    postingLocation: string;
}

const JobSummary = ({
    companyName,
    postingTitle,
    postingPart,
    postingExperience,
    postingEducation,
    postingType,
    postingWorkType,
    postingLocation,
}: JobSummaryProps) => {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col">
                <p className="text-gray-500">{companyName}</p>
                <h3 className="text-2xl font-semibold">{postingTitle}</h3>
            </div>
            <ul className="flex flex-wrap justify-between p-4 border-t border-gray-200 border-b">
                <JobSummaryCell title="직무" content={postingPart} />
                <JobSummaryCell title="경력" content={postingExperience} />
                <JobSummaryCell title="학력" content={postingEducation} />
                <JobSummaryCell
                    title="근무형태"
                    content={`${postingType} (${postingWorkType})`}
                />
                <JobSummaryCell title="근무지역 " content={postingLocation} />
            </ul>
        </section>
    );
};

export default JobSummary;

import JobSummaryCell from "./JobSummaryCell";

interface JobSummaryProps {
    companyName: string;
    postingTitle: string;
    postingPart: string;
}

const JobSummary = ({ companyName, postingTitle, postingPart }: JobSummaryProps) => {
    return (
        <section>
            <p>{companyName}</p>
            <h3>{postingTitle}</h3>
            <ul>
                <JobSummaryCell title="직무" content={postingPart} />
            </ul>
        </section>
    );
};

export default JobSummary;

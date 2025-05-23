import JobPostingCard from "./JobPostingCard";

const JobPostingCardList = ({ jobPostings }: { jobPostings: JobPosting[] }) => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {jobPostings.map(jobPosting => (
                <JobPostingCard
                    key={jobPosting.postingNo}
                    postingNo={jobPosting.postingNo}
                    imageUrl={jobPosting.companyImgA ?? undefined}
                    deadline={jobPosting.postingDeadLine}
                    isBookmarked={jobPosting.bookMarkNo !== null}
                    bookMarkNo={jobPosting.bookMarkNo}
                    title={jobPosting.postingTitle}
                    company={jobPosting.companyName}
                    location={jobPosting.companyAddress ?? undefined}
                    education={jobPosting.postingEducation}
                    companyType={jobPosting.companyType}
                />
            ))}
        </div>
    );
};

export default JobPostingCardList;

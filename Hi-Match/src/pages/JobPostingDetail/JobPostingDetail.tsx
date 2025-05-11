import CompanyProfileCard from "./components/CompanyProfileCard";
import JobContentSection from "./components/JobContentSection";
import JobImageGallery from "./components/JobImageGallery";
import JobSummary from "./components/JobSummary";
import MainLayout from "@/layout/MainLayout";
import { useJobPostingDetail } from "@/hooks/application/useJobPostingDetail";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import TagList from "./components/TagList";
import { useParams } from "react-router-dom";

const JobPostingDetail = () => {
    const { id } = useParams();
    const postingNo = Number(id);
    const companyNo = Number(id);
    
    const { data, company, loading, error } = useJobPostingDetail(
        postingNo,
        companyNo
    );
    const tags = Array.isArray(company?.tag)
        ? company!.tag.map((tag: { tagName: string }) => tag.tagName)
        : [];

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const images = [
        data?.companyImgA,
        data?.companyImgB,
        data?.companyImgC,
    ].filter(Boolean);
    return (
        <MainLayout>
            {loading && <div>Loading...</div>}
            {data && (
                <>
                    <JobImageGallery images={images as string[]} />
                    <section className="mx-auto flex w-full max-w-[1272px] justify-between gap-10 overflow-hidden pt-14 max-[1399px]:px-20">
                        <div className="flex flex-grow flex-col gap-10">
                            <JobSummary
                                companyName={data.companyName}
                                postingTitle={data.postingTitle}
                                postingPart={data.postingPart}
                                postingExperience={data.postingExperience}
                                postingEducation={data.postingEducation}
                                postingType={data.postingType}
                                postingWorkType={data.postingWorkType}
                                postingLocation={data.postingLocation}
                            />
                            <JobContentSection
                                postingContent={data.postingContent}
                                postingQuestion={data.postingQuestion}
                            />
                            <TagList tags={tags} />
                        </div>
                        {company && <CompanyProfileCard company={company} />}
                    </section>
                </>
            )}
        </MainLayout>
    );
};

export default JobPostingDetail;

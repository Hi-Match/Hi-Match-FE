import CompanyProfileCard from "./components/CompanyProfileCard";
import JobContentSection from "./components/JobContentSection";
import JobImageGallery from "./components/JobImageGallery";
import JobMetaInfo from "./components/JobMetaInfo";
import JobSummary from "./components/JobSummary";
import MainLayout from "@/layout/MainLayout";
import { useJobPostingDetail } from "@/hooks/application/useJobPostingDetail";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const JobPostingDetail = () => {
    const { data, loading, error } = useJobPostingDetail(1);

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
                <div className="mx-auto flex w-full max-w-[1272px] flex-col gap-20 overflow-hidden pt-14 max-[1399px]:px-20">
                    <JobImageGallery images={images as string[]} />
                    <JobSummary
                        companyName={data.companyName}
                        postingTitle={data.postingTitle}
                        postingPart={data.postingPart}
                    />
                    <JobMetaInfo />
                    <JobContentSection />
                    <CompanyProfileCard />
                </div>
            )}
        </MainLayout>
    );
};

export default JobPostingDetail;

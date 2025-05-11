import MainLayout from "@/layout/MainLayout";
import { useJobPostings } from "@/hooks/application/useJobPostings";
import { useRecommandJobPostings } from "@/hooks/application/useRecommandJobPostings";
import { useState } from "react";
import LatestJobSection from "./components/LatestJobSection";
import RecommendJobSection from "./components/RecommendJobSection";
import JobSearchFilterBar from "@/components/JobSearchFilterBar/JobSearchFilterBar";
import TestBanner from "./components/TestBanner";

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [jobType, setJobType] = useState("");
    const [region, setRegion] = useState<{ region: string; district: string }>({
        region: "",
        district: "",
    });
    const [education, setEducation] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const buildJobListParams = () => {
        const params: JobPostingParams = { page: currentPage };
        if (searchValue) params.keyword = searchValue;
        if (region.region) params.companyAddress = [region.region];
        if (jobType) params.companyPart = [jobType];
        if (employmentType) params.companyType = [employmentType];
        if (education) params.postingEducation = [education];
        return params;
    };

    const { jobPostings, loading, error, maxPage } =
        useJobPostings(buildJobListParams());

    const {
        jobPostings: recommendJobPostings,
        loading: recommendLoading,
        error: recommendError,
    } = useRecommandJobPostings();

    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    return (
        <MainLayout>
            <div className="mx-auto flex w-full max-w-[1272px] flex-col gap-20 pt-14 max-[1399px]:px-20">
                <JobSearchFilterBar
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    onSearch={handleSearch}
                    jobType={jobType}
                    onJobTypeChange={setJobType}
                    region={region}
                    onRegionChange={setRegion}
                    education={education}
                    onEducationChange={setEducation}
                    employmentType={employmentType}
                    onEmploymentTypeChange={setEmploymentType}
                />
                {recommendLoading ? null : recommendJobPostings.length > 0 ? (
                    <RecommendJobSection
                        jobPostings={recommendJobPostings}
                        loading={recommendLoading}
                        error={recommendError}
                    />
                ) : (
                    <TestBanner />
                )}
                <LatestJobSection
                    jobPostings={jobPostings}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    maxPage={maxPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </MainLayout>
    );
};

export default MainPage;
